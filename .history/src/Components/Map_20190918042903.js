import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getNearby, getPages, getPhoto } from '../Requests/map-requests' 
import '../css/App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from '../Actions/places-actions'
import { updateActivePlace } from '../Actions/active-actions'
import ReactDOMServer from 'react-dom/server';
import { getZipCartography, getTradeZoneCartography, getTractCartography } from '../Requests/cartography-requests'
import { getPopulation  } from '../Requests/city-requests' 
import {updateTract} from '../Actions/tract-actions'
import Form from 'react-bootstrap/Form'
import { getPoints } from '../Helpers/TradeZone'
import { ZIP, TRADE_ZONE} from '../Components/DemographicsPanel'
import { mapOptions, GOOGLE_KEY, google } from '../Constants.js'
import { renderCircle, renderMarker, renderInfoContent, BLUE_MARKER, YELLOW_MARKER, GREEN_MARKER, RED_MARKER } from './GoogleMapComponents'
import { activeSelector, addressSelector, businessTypeSelector, dataRangeSelector, placesSelector, stateSelector, tractSelector, zipSelector } from '../Reducers/selectors'
import SliderSwitch from './UI/SliderSwitch'

const infoWindow =  new google.maps.InfoWindow()
class SimpleMap extends Component {
  static defaultProps = {
    defaultCenter: {
      lat: 59.95,
      lng: 30.33
    },
    defaultzoom: 11
  };

  constructor(props) {
    super(props)
    this.state = {
      center: this.props.center,
      map : undefined,
      markers : new Map(),
      place_details : new Map(),
      place_photos : new Map(),
      places_cache : new Map(),
      address_line : this.props.address.street + ', ' + this.props.address.city + ' ' + this.props.address.state + ', ' + this.props.address.zip,
      boundaries : getPoints(this.props.center, 0.804),
      cartography : {},
      display_cartography: true,
      business_type: this.props.business_type
    }  
  
    this.onUpdatePlaces = this.onUpdatePlaces.bind(this);
    this.onUpdateActivePlace = this.onUpdateActivePlace.bind(this);
    this.onUpdateTract = this.onUpdateTract.bind(this)
    this.lessPlaces = this.lessPlaces.bind(this);
    this.loadAllPlaces = this.loadAllPlaces.bind(this);
    this.loadMorePlaces = this.loadMorePlaces.bind(this);
    this.loadDefaultPlaces = this.loadDefaultPlaces.bind(this);
    this.exampleRef = React.createRef()
    this.updateMarkers = this.updateMarkers.bind(this)
    this.updateMarker = this.updateMarker.bind(this)
    this.updateInfoWindow = this.updateInfoWindow.bind(this)
    this.getopen  = this.getOpen.bind(this)
    this.getPlaceDetails = this.getPlaceDetails.bind(this)
    this.updatePlaceDetails = this.updatePlaceDetails.bind(this)
    this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
    this.loadCartography = this.loadCartography.bind(this)
    this.renderCartography = this.renderCartography.bind(this)
    this.getInfoContent = this.getInfoContent.bind(this)
    this.handleSwitch = this.handleSwitch.bind(this)
    this.clearCartography = this.clearCartography.bind(this)
    this.checkIsCity = this.checkIsCity.bind(this)
    this.onPlacesCountChange = this.onPlacesCountChange.bind(this)
    this.updateRadii =this.updateRadii.bind(this)
    this.initCache = this.initCache.bind(this)

    // to-do create function updateInfoWindow
    setInterval( () => {
      let isBound = (infoWindow.getMap() ? true : false)
      if (!isBound && infoWindow.marker != undefined) {
        let img = ''
        if (infoWindow.marker.place.types.includes(this.props.business_type)) {
          img = RED_MARKER
        } else {
          img = YELLOW_MARKER
        }
        infoWindow.marker.marker.setIcon(img)
      }
    }, 500);
  }

  async componentDidMount() {
    this.loadDefaultPlaces()
    let isCity = await this.checkIsCity()
    this.setState({ isCity : isCity})
    this.updateRadii()
    this.initCache()
  }

  componentDidUpdate(prevProps, prevState) {
    // active place change
    if (this.props.active_place !== prevProps.active_place) 
      if (this.props.active_place.toString().length > 0) {
        this.setState({center : this.props.active_place.geometry.location})

        // highlight marker on map
        if (prevProps.active_place.toString().length > 0)
          this.updateMarker(this.state.markers.get(prevProps.active_place.id))
        this.state.markers.get(this.props.active_place.id).marker.setIcon(GREEN_MARKER)
        google.maps.event.trigger(this.state.markers.get(this.props.active_place.id).marker, 'click')
      }

    // update markers 
    if (this.props.places !== prevProps.places) {
      if (this.state.map != undefined) {
        Array.from(this.state.markers).map((marker, i) => {
          marker[1].marker.setMap(null)
        })
        this.updateMarkers(this.state.map)
      }
    }
    // update geojson
    if (this.state.map !== undefined) {
      if (this.props.data_range !== prevProps.data_range) {
        if (this.state.display_cartography)
          this.renderCartography()
      }   
    }
  }

  initCache() {
    let business_types = [ 'restaurant', 'bar', 'cafe', 'beauty_salon',
     'clothing_store', 'convenvience_store', 'locksmith', 'bakery',
     'car_dealer', 'supermarket']

     for (let type of business_types) {
       this.state.places_cache.set(type, new Map())
     }
  }
  async checkIsCity() {
    let data = await getPopulation(this.props.center.lat, this.props.center.lng).then(res => res)
      .catch(err => console.error('city error', err))
    let population = Number(data[0].B01003_001E)
    console.log('RFM', population, population >= 1000000)
    return population >= 1000000
  }
  clearCartography() {
    this.state.map.data.forEach((feature) => {
      this.state.map.data.remove(feature)
    })
  }
  renderCartography() {
    // clear data layer 
      this.clearCartography()
      // render cartography
      if (this.props.data_range == ZIP) {
        if (this.state.cartography.zip !== undefined)
          this.state.cartography.zip.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
      } 
      else if (this.props.data_range == TRADE_ZONE) {
        if (this.state.cartography.tradezone !== undefined) {
          this.state.cartography.tradezone.forEach(featureSets => {
            featureSets.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
          })
       } else {
         setTimeout(() => this.renderCartography(), 100)
       }
    }
  }

  loadCartography() {
     getZipCartography(this.props.address.state.toString().toLowerCase(), this.props.address.zip).then((data) => {
      let mCartography = Object.assign({}, this.state.cartography)
      mCartography.zip = data
      this.setState({cartography : mCartography})
      // init geojson rendering
      this.renderCartography()
    })
    getTradeZoneCartography(this.props.address.state.toString().toLowerCase(), this.props.center.lat, this.props.center.lng)
      .then((data) => {
        let mCartography = Object.assign({}, this.state.cartography)
        mCartography.tradezone = data
        this.setState({ cartography : mCartography})
      })
  }
    
  async loadDefaultPlaces() {
    console.log(this.state.places_cache)
    let response = await getNearby(this.props.address, this.props.business_type, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      for (let place of morePlaces) {
        if (!this.state.places_cache.get(this.state.business_type).has(place.place_id)) {
          this.state.places_cache.get(this.state.business_type).set(place.place_id, place)
        } 
      }
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
      })
      this.setState({ places_count : 20 })
    })  
  }

  loadPlaceType(type) {
    getNearby(this.props.address, type, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
      })
    })
  }

  loadAllPlaces() {
    getNearby(this.props.address, 'establishment', (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({ places_count : 20 })
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
      })
    })
  }

  loadMorePlaces(index, hasCallback, callback) {
        let cached_places = Array.from(this.state.places_cache.get(this.state.business_type).values())
        if (cached_places.length > index) {
          console.log('pull from cache', index, cached_places.length)
          var morePlaces = this.props.places.concat(cached_places.slice(index, index + 20))
          this.setState({places: morePlaces}, () => {
            this.onUpdatePlaces(morePlaces)
            if (hasCallback) { callback() }
          })
        } else {
          console.log('load more',index, cached_places.length)
        getPages(this.state.token, (data, token) => {
          this.setState({ token : token })
        var morePlaces = this.props.places.concat(data)
        for (let place of morePlaces) {
          if (!this.state.places_cache.get(this.state.business_type).has(place.place_id)) {
            this.state.places_cache.get(this.state.business_type).set(place.place_id, place)
          } 
        }
        this.setState({places: morePlaces}, () => {
          this.onUpdatePlaces(morePlaces)
          if (hasCallback) { callback() }
        })
      })
    }
  }
  lessPlaces() {
    if (this.props.places.length > 20) {
      var places = this.props.places
      places = places.slice(0, (places.length-20))
      this.setState({places: places})
      this.onUpdatePlaces(places)
    }
  }
  onBusinessFormChange(event) {
    this.setState({[event.target.name]: event.target.value})
    this.loadPlaceType(event.target.value)
  }
  // to do clean up & cache ffs
  onPlacesCountChange(event) {
    this.setState({places_count: event.target.value})
      switch (event.target.value) {
        case '20':
            var places = this.props.places
            places = places.slice(0, 20)
            this.setState({places: places})
            this.onUpdatePlaces(places)
            break;

        case '40':
            if (this.props.places.length < 40) {
              this.loadMorePlaces(20, false)
            } else {
              var places = this.props.places
              places = places.slice(0, 40)
              this.setState({places: places})
              this.onUpdatePlaces(places)
            }
            break;

        case '60':
            if (this.props.places.length < 40) {
              this.loadMorePlaces(20, true, ()=> this.loadMorePlaces(40, false))
              
            } else if (this.state.places.length == 40) {
              this.loadMorePlaces(40, false)
            }
            else {
              var places = this.props.places
              places = places.slice(0, 60)
              this.setState({places: places})
              this.onUpdatePlaces(places)
            }
            break;
      }
  }
  onUpdatePlaces(data) {
    this.props.onUpdatePlaces(data)
  }
  onUpdateActivePlace(data) {
    this.props.onUpdateActivePlace(data)
  }
  onUpdateTract(data) {
    this.props.onUpdateTract(data)
  }
  getInfoContent(place) {
   return renderInfoContent.apply(this, [place])
  }

  updateRadii() {
    // radii
    if (this.state.isCity != undefined) {
      console.log('RFM', this.state.isCity)
      if (this.state.isCity) {
        //  0.220 : 0.402);
         const circle1 = renderCircle(402, "#00ff00", this.state.map, this.state.center) //0.0125 miles
         const circle2 = renderCircle(804, "#ffff00", this.state.map, this.state.center) // 0.25 miles
          // to-do cleanup, add label
        let points = getPoints(this.state.center, 0.402)
        renderMarker('circle1', points[0], this.state.map, '0.25 miles', GREEN_MARKER)
        points = getPoints(this.state.center, 0.804)
        renderMarker('circle1', points[0], this.state.map, '0.5 miles', YELLOW_MARKER)

      } else if (!this.state.isCity) {
       const circle1 = renderCircle(4828, "#00ff00", this.state.map, this.state.center) // 3 miles
       const circle2 = renderCircle(8046, "#ffff00", this.state.map, this.state.center) // 5 miles
       // to-do cleanup, add label
        let points = getPoints(this.state.center, 4.828)
        let marker1 = renderMarker('circle1', points[0], this.state.map, '3 miles', GREEN_MARKER)
        points = getPoints(this.state.center, 8.046)
        renderMarker('circle1', points[0], this.state.map, '5 miles', YELLOW_MARKER)
      }
    }
  }
    
   // markers
  updateMarkers = (map) =>  {
    let markerMap = this.state.markers
    let count = 0;
    Array.from(this.props.places).map((place, i) => {
    var id= place.id
    var img = ''
    if (id === this.props.active_place.id) {
      img = GREEN_MARKER
    } else if (place.types.includes(this.props.business_type)) {
      img = RED_MARKER
    } else {
      img = YELLOW_MARKER
    }
    count += 1
    let marker = renderMarker(i, place.geometry.location, map, place.name, img)
    markerMap.set(id, {marker: marker, place: place})
  })
  this.setState({ markers : markerMap})
  this.updateInfoWindow(map)
}
// Array.from(p, ([key, value]) => value * value)
updateInfoWindow = (map) => Array.from(this.state.markers, ([key, value]) =>  {

  // to close window on exit
  value.marker.addListener('click',  () => {
       this.onUpdateActivePlace(value.place)
        this.updatePlaceDetails( () => {
          infoWindow.setContent(ReactDOMServer.renderToStaticMarkup(this.getInfoContent(value.place)))
          infoWindow.marker = value
          infoWindow.open(map, value.marker) 
        });
       })
})

updatePlaceDetails(callback) {

  // get details
  if (!this.state.place_details.has(this.props.active_place.id)) {
    this.getPlaceDetails(this.state.map, this.props.active_place.place_id, (details) => {
      this.state.place_details.set(this.props.active_place.id, details)

         // get photo
    if (!this.state.place_photos.has(this.props.active_place.id)) {
      if (this.props.active_place.photos !== undefined) {
       getPhoto(this.props.active_place.photos[0].photo_reference, 400, 400, (data) => {
        this.state.place_photos.set(this.props.active_place.id, data.url)
        callback()
      })
      } else {
        callback()
      }
    }
    })
  } else {
    callback()
  }
}

getPlaceDetails = (map, place_id, callback) => {
  var service = new google.maps.places.PlacesService(map);
  var request = {
    placeId: place_id,
  //  fields: ['name', 'formatted_address', 'place_id', 'geometry']
    fields: ['formatted_address', 'opening_hours', 'website']
  };
  
     // get details
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(place)
      } else {
        console.log('error', status)
      }
    });
  }

getOpen = (opening_hours) => {
  if (opening_hours === undefined)
    return 'Unknown'
  else {
    let answer = (opening_hours.is_open) ? "Yes" : "No"
    return answer
  }
}
updateMarker = (marker) => {
  var img = ''
  if (marker.place.id === this.props.active_place.id) {
    img = GREEN_MARKER
  } else if (marker.place.types.includes(this.props.business_type)) {
    img = RED_MARKER
  } else {
    img = YELLOW_MARKER
  }
  marker.marker.setIcon(img)
}

handleSwitch = (checked) => {
  if (checked) {
   // this.setState({ display_cartography : true })
    this.renderCartography()
  } else {
  //  this.setState({ display_cartography : false })
    this.clearCartography()
  }
}

  render() {
    const apiIsLoaded = (map, maps, center) => {
      this.state.map = map
      let yourBusinessMarker = renderMarker(undefined, center, map, 'Your Business', BLUE_MARKER)
      var content ='<h3>Your ' + this.props.business_type.toString() +'</h3>'
         yourBusinessMarker.addListener('click', () => {
          infoWindow.setContent(content)
          infoWindow.open(map, yourBusinessMarker)
          infoWindow.marker = yourBusinessMarker
         console.log(infoWindow)
      })

      this.loadCartography()
    };

  const MapButtons = () => 
  <div className='map-control_bar'>
    
         <div style = {{ marginLeft: '5%'}}>
          <p style={{textAlign: 'center', marginBottom: '-3%'}}> Zone</p>
         <SliderSwitch switchFunction={this.handleSwitch}></SliderSwitch>
         </div>
         <Form.Control value={this.state.business_type} as="select" name="business_type" onChange={this.onBusinessFormChange} style={{width: '200px', textAlign: 'center', display: 'inline', marginLeft: '75px', marginRight: '75px'}}>
                        <option>restaurant</option>
                        <option>bar</option>
                        <option>cafe</option>
                        <option>beauty_salon</option>
                        <option>clothing_store</option>
                        <option>convenvience_store</option>
                        <option>locksmith</option>
                        <option>bakery</option>
                        <option>car_dealer</option>
                        <option>supermarket</option>
          </Form.Control>
          <button className='map-control_button' onClick={this.loadDefaultPlaces} className='map_buttons' style={{float: 'right' }}>
           Competition
          </button> 
          <button className='map-control_button' onClick={this.loadAllPlaces} className='map_buttons' style={{float: 'right' }}>
           All
          </button> 
          <Form.Control value={this.state.places_count} as="select" name="places_count" onChange={this.onPlacesCountChange} style={{width: '100px', textAlign: 'center', display: 'inline', float: 'right'}}>
                        <option>20</option>
                        <option>40</option>
                        <option>60</option>
          </Form.Control>
         </div>
 
    return (
      // Important! Always set the container height explicitly
      // to-do export styling to .css 
      <div className='map_container'>
         <MapButtons></MapButtons>
        
      <div style={{height: this.props.height}}>
        <GoogleMapReact
          options={mapOptions}
          bootstrapURLKeys={{ key: GOOGLE_KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
          yesIWantToUseGoogleMapApiInternals={true}
          layerTypes={['TrafficLayer', 'TransitLayer']}
          id={'map'}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state.center)}
        >
        </GoogleMapReact>
      </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  placesSelector, 
  activeSelector,
  addressSelector,
  businessTypeSelector,
  zipSelector,
  stateSelector,
  tractSelector,
  dataRangeSelector,
  (places, active_place, address, business_type, zip, state, tract, data_range) => ({
    places, 
    active_place,
    address,
    business_type,
    zip,
    state, 
    tract,
    data_range
  })
);
 
const mapActionsToProps = {
  onUpdatePlaces: updatePlaces,
  onUpdateActivePlace: updateActivePlace,
  onUpdateTract: updateTract
};

export default connect(mapStateToProps, mapActionsToProps) (SimpleMap);