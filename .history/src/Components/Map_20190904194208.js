import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getNearby, getPages, getPhoto} from '../Requests/map-requests' 
import '../css/App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from '../Actions/places-actions'
import { updateActivePlace } from '../Actions/active-actions'
import ReactDOMServer from 'react-dom/server';
import { getZipCartography, getTradeZoneCartography, getTractCartography } from '../Requests/cartography-requests'
import {updateTract} from '../Actions/tract-actions'
import Form from 'react-bootstrap/Form'
import { getPoints } from '../Helpers/TradeZone'
import { ZIP, TRADE_ZONE} from  '../Components/DemographicsPanel'
import { mapOptions, GOOGLE_KEY, google } from '../Constants.js'
import { renderCircle, renderMarker, renderInfoContent } from './GoogleMapComponents'
import { activeSelector, addressSelector, businessTypeSelector, dataRangeSelector, placesSelector, stateSelector, tractSelector, zipSelector } from '../Reducers/selectors'
const BLUE_MARKER = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
const YELLOW_MARKER = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
const RED_MARKER = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
const GREEN_MARKER = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
 
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
      address_line : this.props.address.street + ', ' + this.props.address.city + ' ' + this.props.address.state + ', ' + this.props.address.zip,
      boundaries : getPoints(this.props.center, 0.804),
      cartography : {}
    }  
  
    this.onUpdatePlaces = this.onUpdatePlaces.bind(this);
    this.onUpdateActivePlace = this.onUpdateActivePlace.bind(this);
    this.onUpdateTract = this.onUpdateTract.bind(this)
    this.loadMorePlaces = this.loadMorePlaces.bind(this);
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
  }

  componentDidMount() {
    this.loadDefaultPlaces()
    // get nearby places
    // https://developers.google.com/places/web-service/supported_types
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
          this.renderCartography()
      }   
    }
  }

  renderCartography() {
    // clear data layer 
      this.state.map.data.forEach((feature) => {
        this.state.map.data.remove(feature)
      })

      // render cartography
      if (this.props.data_range == ZIP) {
        if (this.state.cartography.zip !== undefined)
          this.state.cartography.zip.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
      } 
      else if (this.props.data_range == TRADE_ZONE) {
        if (this.state.cartography.tradezone !== undefined) {
          this.state.cartography.tradezone.forEach(featureSets => {
            console.log(featureSets)
            featureSets.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
          })
       } else {
         setTimeout(() => this.renderCartography(), 100)
       }
    }
  }

  loadCartography() {
     getZipCartography(this.props.state.toString().toLowerCase(), this.props.zip).then((data) => {
      let mCartography = Object.assign({}, this.state.cartography)
      mCartography.zip = data
      this.setState({cartography : mCartography})
      // init geojson rendering
      this.renderCartography()
    })
    getTradeZoneCartography(this.props.state.toString().toLowerCase(), this.props.center.lat, this.props.center.lng)
      .then((data) => {
        let mCartography = Object.assign({}, this.state.cartography)
        mCartography.tradezone = data
        this.setState({ cartography : mCartography})
      })
  }
    
  loadDefaultPlaces() {
    getNearby(this.props.address, ' ', this.props.business_type, 1000, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
      })
    })  
  }

  loadPlaceType(type) {
    getNearby(this.props.address, ' ', type, 1000, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
    //    this.loadMorePlaces()
      })
    })
  }

  loadAllPlaces() {
    getNearby(this.props.address, ' ', 'establishment',   1000, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
   //     this.loadMorePlaces()
      })
    })
  }

  loadMorePlaces() {
      if (this.props.places.length < 60) {
        getPages(this.state.token, (data, token) => {
        var morePlaces = this.props.places.concat(data)
        this.setState({places: morePlaces}, () => {
          this.onUpdatePlaces(morePlaces)
   //       this.loadMorePlaces()
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
    

   // markers
  updateMarkers = (map) =>  {
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
    renderMarker()
    var marker = new google.maps.Marker({
      key: i,
      position: place.geometry.location,
      map: map,
      title: place.name,
      icon: img
    });
  this.state.markers.set(id, {marker: marker, place: place})
  })

  this.updateInfoWindow(map)
}
// Array.from(p, ([key, value]) => value * value)
updateInfoWindow = (map) => Array.from(this.state.markers, ([key, value]) =>  {

  // to close window on exit
  value.marker.addListener('click',  () => {
       this.onUpdateActivePlace(value.place)
        this.updatePlaceDetails( () => {
        var infowindow = new google.maps.InfoWindow({
          content: ReactDOMServer.renderToStaticMarkup(this.getInfoContent(value.place))
        });
        infowindow.open(map, value.marker)
       })
  });
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
  // get photo 
  
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

  render() {
    const apiIsLoaded = (map, maps, center) => {
      this.state.map = map
      let yourBusinessMarker = renderMarker(undefined, center, map, 'Your Business', BLUE_MARKER)
      var content ='<h3>Your ' + this.props.business_type.toString() +'</h3>'
         var infowindow = new google.maps.InfoWindow({
           content: content
         });

         yourBusinessMarker.addListener('click', () => {
         infowindow.open(map, yourBusinessMarker)
      })

       // radii
      const circle1 = renderCircle(402.336, "#00ff00", map, center)
      const circle2 = renderCircle(804.672, "#ffff00", map, center)
      const circle3 = renderCircle(1609.34, "#0D00ff", map, center )
      this.loadCartography()
    };

  const MapButtons = () => 
  <div className='map-control_bar'>
        <button className='map-control_button'  onClick={this.lessPlaces} className='map_buttons' style={{float: 'left'}}>
          Less
        </button>
        <button className='map-control_button'  onClick={this.loadMorePlaces} className='map_buttons' style={{float: 'left'}}>
          More
         </button>
      
         
         <Form.Control as="select" name="business_type" onChange={this.onBusinessFormChange} style={{width: '200px', textAlign: 'center', display: 'inline', marginLeft: '75px', marginRight: '75px'}}>
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

          <button className='map-control_button'  onClick={this.loadDefaultPlaces} className='map_buttons' style={{float: 'right' }}>
           Competition
          </button> 
          <button className='map-control_button'  onClick={this.loadAllPlaces} className='map_buttons' style={{float: 'right' }}>
           All
          </button> 
         </div>
 
 
    return (
      // Important! Always set the container height explicitly
      // to-do export styling to .css 
      <div className='map_container'>
         <MapButtons></MapButtons>
        
      <div style={{height: '75vh'}}>
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