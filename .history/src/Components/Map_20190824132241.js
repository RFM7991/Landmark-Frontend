import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getNearby, getPages, getPhoto, testMap} from '../Requests/map-requests' 
import '../css/App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from '../Actions/places-actions'
import { updateActivePlace } from '../Actions/active-actions'
import ReactDOMServer from 'react-dom/server';
import ReactStreetview from 'react-streetview';
import { getZipBounds, getTractBounds } from '../Requests/cartography-requests'
import { getTract } from '../Requests/city-requests'
import {updateTract} from '../Actions/tract-actions'
import Form from 'react-bootstrap/Form'
import { getPoints } from '../Helpers/TradeZone'
import { getTradeZoneCartography } from '../Requests/tradezone-requests'
import { ZIP, TRADE_ZONE} from  '../Components/DemographicsPanel'
const BLUE_MARKER = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
const YELLOW_MARKER = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
const RED_MARKER = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
const GREEN_MARKER = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'

const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'; 
const google = window.google;
 
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
      tradezone : undefined
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
    this.getInfoContent = this.getInfoContent.bind(this)
    this.getopen  = this.getOpen.bind(this)
    this.getPlaceDetails = this.getPlaceDetails.bind(this)
    this.updatePlaceDetails = this.updatePlaceDetails.bind(this)
    this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
    this.loadTradeZone = this.loadTradeZone.bind(this)
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
    if (this.props.places !== prevProps.places) 
  
      if (this.state.map != undefined) {
          // render cartography
          if (this.props.data_range == TRADE_ZONE)
          this.loadTradeZone((data) => {
            //TO-do sort out anomylous results 
            data.forEach(e => {
              e.forEach(j => {
                this.state.map.data.addGeoJson(j)
              })
            })
          })
          if (this.props.data_range === ZIP)
          getZipBounds(this.props.state.toString().toLowerCase(), this.props.zip, (data) => {
            data.forEach(e => {
              this.state.map.data.addGeoJson(e[0])
            });
           })    
          
        Array.from(this.state.markers).map((marker, i) => {
          marker[1].marker.setMap(null)
        })
        this.updateMarkers(this.state.map)
      }
  }

  loadTradeZone(callback) {
    console.log('data_range', this.props.data_range)
    if (this.props.data_range == TRADE_ZONE)
      this.setState({tradezone: getTradeZoneCartography(this.props.state, this.props.center, true, (data) => callback(data))})
  }
    
  loadDefaultPlaces() {
    getNearby(this.props.address, ' ', this.props.business_type, 1000, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
    //    this.loadMorePlaces()
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
          content: ReactDOMServer.renderToStaticMarkup( this.getInfoContent(value.place))
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

getInfoContent = (place) => {
  var details = this.state.place_details.get(place.id)
  var photo_url = this.state.place_photos.get(place.id)
  return (
  <div id="content">
    <div id="siteNotice">
    </div>
      <h3 style={{textAlign: 'center'}}>{place.name}</h3>
      <br></br>
      <img style={{display: 'block',  marginRight: 'auto', marginLeft: 'auto', width: '50%'}}src={photo_url}></img> 
     <br></br>
      <div id="bodyContent">
        <p style={{textAlign: 'center'}}><strong>{details.formatted_address}</strong></p>
        <p><a target="_blank" href={details.website}>{details.website}</a></p>
        <p>
          Rating: {place.rating} / 5.0
          <br></br>
          Total Ratings: {place.user_ratings_total}
          <br></br>
          Open Now: {this.getOpen(place.opening_hours)}
        </p>
    </div>
  </div>)
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
    console.log('update map', this.props)

    const apiIsLoaded = (map, maps, center) => {
      console.log('API IS LOADED')
      testMap(map, this.props.center, this.props.business_type)
      this.state.map = map

      var marker = new google.maps.Marker({
        position: center,
        map: map,
        title: 'Your Business',
        icon: BLUE_MARKER
      });
      var content ='<h3>Your ' + this.props.business_type.toString() +'</h3>'
         var infowindow = new google.maps.InfoWindow({
           content: content
         });

      marker.addListener('click', () => {
         infowindow.open(map, marker)
      })

       // radii
      const circle1 = new google.maps.Circle({
        strokeColor: "#00ff00",
        strokeOpacity: 0.5,
        strokeWeight: 4,
        fillColor: "#00ff00",
        fillOpacity: 0.0,
        map,
        center: center,
        radius: 402.336
       
      });
      const circle2 = new google.maps.Circle({
        strokeColor: "#ffff00",
        strokeOpacity: 0.5,
        strokeWeight: 4,
        fillColor: "#ffff00",
        fillOpacity: 0.0,
        map,
        center: center,
        radius:  804.672
      });

      const circle3 = new google.maps.Circle({
        strokeColor: "#0D00ff",
        strokeOpacity: 0.5,
        strokeWeight: 4,
        fillColor: "#0D00ff",
        fillOpacity: 0.0,
        map,
        center: center,
        radius:  1609.34
      });

    // boundaries  
    console.log(this.props.state, this.props.zip)
    getTract(this.props.center.lat, this.props.center.lng, (data) => {
      this.onUpdateTract(data[0].tract)
      getTractBounds(this.props.state.toString().toLowerCase(), this.props.tract, (data) => {
        console.log(data.forEach(e => console.log(e)))
        data.forEach(e => map.data.addGeoJson(e))
      })
    })
    
    };

    const mapOptions =  {
      streetViewControl: true,
      scaleControl: true,
      fullscreenControl: false,
      styles: [{
          featureType: "poi.business",
          elementType: "labels",
          stylers: [{
              visibility: "off"
          }]
      }],
      gestureHandling: "greedy",
      disableDoubleClickZoom: true,
      minZoom: 5,
      maxZoom: 100,

      mapTypeControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.BOTTOM_CENTER,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID
          ]
      },
      zoomControl: true,
      clickableIcons: false
  };
  // see https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanoramaOptions

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
          bootstrapURLKeys={{ key: KEY}}
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

const streetViewPanoramaOptions = {
  position: {lat: 46.9171876, lng: 17.8951832},
  pov: {heading: 100, pitch: 0},
  zoom: 1
};

const activeSelector = createSelector (
  state => state.active_place,
  active_place => active_place
)

const placesSelector = createSelector (
  state => state.places,
  places => places
)

const addressSelector = createSelector (
  state => state.address,
  address => address
);

const businessTypeSelector = createSelector (
  state => state.business_type,
  business_type => business_type
);

const zipSelector = createSelector (
  state => state.zip,
  zip => zip
)

const tractSelector = createSelector (
  state => state.tract,
  tract => tract
)

const stateSelector = createSelector (
  state => state.state,
  state => state
)

const dataRangeSelector = createSelector (
  state => state.data_range,
  data_range => data_range
)

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