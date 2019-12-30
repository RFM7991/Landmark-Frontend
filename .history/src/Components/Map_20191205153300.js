import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import GoogleMapReact from 'google-map-react';
import { getNearby, getPages, getPhoto } from '../Requests/map-requests' 
import '../css/App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from '../Actions/places-actions'
import { updateActivePlace } from '../Actions/active-actions'
import ReactDOMServer from 'react-dom/server';
import { getZipCartography, getTradeZoneCartography } from '../Requests/cartography-requests'
import {updateTract} from '../Actions/tract-actions'
import Form from 'react-bootstrap/Form'
import { getPoints } from '../Helpers/TradeZone'
import { ZIP, TRADE_ZONE} from '../Components/DemographicsPanel'
import { GOOGLE_KEY, google, BUSINESS_TYPES, POI_TYPES } from '../Constants.js'
import { renderCircle, renderMarker, renderComplexMarker, renderInfoContent, BLUE_MARKER, YELLOW_MARKER, GREEN_MARKER, RED_MARKER, BLUE_DOT_05, YELLOW_DOT_25, YELLOW_DOT_3, BLUE_DOT_5 } from './GoogleMapComponents'
import { activeSelector, addressSelector, businessTypeSelector, dataRangeSelector, placesSelector, stateSelector, tractSelector, zipSelector, isCitySelector, tradeZoneBoundsSelector, transportationSelector } from '../Reducers/selectors'
import SliderSwitch from './UI/SliderSwitch'
import Button from 'react-bootstrap/Button';
import { updateTradeZoneBounds } from '../Actions/tradeZoneBoundaries-actions'
import { getTradeZoneBounds } from '../Requests/tradezone-requests'
import ReactStreetview from 'react-streetview';
import { getDistancesFromMap } from '../Helpers/Subways'
import { updateTransportation} from '../Actions/transportation-actions'

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
    this.myRef = React.createRef();
    this.streetView = React.createRef();
    this.serice = new google.maps.StreetViewService;
    let defaultPlace = this.props.business_type.type
    let type = this.props.business_type.type
    let business_option = type.replace(/_/g, ' ')
    if (type == 'lodging') type = 'hotels /lodging'
    else if (defaultPlace == 'residential') {
      defaultPlace = 'establishment'
      business_option = 'all'
    }

    this.state = {
      center: this.props.center,
      map : undefined,
      markers : new Map(),
      place_details : new Map(),
      place_photos : new Map(),
      places_cache : new Map(),
      tokens_cache : new Map(),
      places_count : 20,
      address_line : this.props.address.street + ', ' + this.props.address.city + ' ' + this.props.address.state + ', ' + this.props.address.zip,
      boundaries : getPoints(this.props.center, 0.804, 1),
      cartography : {},
      display_cartography: true,
      business_type: defaultPlace,
      cartographyLoaded : false,
      poi : 'none',
      business_type_option: business_option,
      aerial : true,
      zoom : this.props.zoom,
      siteView: false,
      mapType : google.maps.MapTypeId.SATELLITE,
  //    heading: 100,
      mapOptions : {
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
      }
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
    this.onPlacesCountChange = this.onPlacesCountChange.bind(this)
    this.updateRadii =this.updateRadii.bind(this)
    this.initCache = this.initCache.bind(this)
    this.onUpdateTradeZoneBounds = this.onUpdateTradeZoneBounds.bind(this)
    this.loadTradeZoneCartography = this.loadTradeZoneCartography.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onPoiFormChange = this.onPoiFormChange.bind(this)
    
    // to-do create function updateInfoWindow
    setInterval(async () => {
        let isBound = (infoWindow.getMap() ? true : false)
        if (!isBound && infoWindow.marker != undefined && infoWindow.marker.key != 'your_business') {
          let img = ''
          if (infoWindow.marker.place.place_id == this.props.address.place.place_id) {
            img = BLUE_MARKER
          }
          else if (this.props.business_type.type != 'residential' && infoWindow.marker.place.types.includes(this.props.business_type.type)) {
            img = RED_MARKER
          } else {
            img = YELLOW_MARKER
          }
          infoWindow.marker.marker.setIcon(img)
        }
    }, 500);
  }

  async componentDidMount() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    this.initCache()
    await this.loadTradeZoneCartography()
  }

  async componentDidUpdate(prevProps, prevState) {
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
    if (this.props.places !== prevProps.places && !(!this.state.siteView && prevState.siteView)) {
      if (this.state.map != undefined) {
        let all_markers =  Array.from(this.state.markers.values())
        let markers_to_delete = [];
        let markers_to_keep = new Map(); 
        console.log('UPDATE MARKERS', prevProps.places.length, this.props.places.length, this.props.places[0], prevProps.places[0])
         
        if (prevProps.places.length > this.props.places.length) { 
          console.log('1', all_markers.length)
          markers_to_delete = all_markers.slice(this.props.places.length, prevProps.places.length)
          all_markers.slice(0, this.props.length).forEach(m => markers_to_keep.set(m.place.id, 0)) // set placeholder, actual value not needed
        } 
        else if (prevProps.places.length < this.props.places.length) {
          console.log('2')
          let arr = all_markers.slice(0, prevProps.places.length)
          arr.forEach(m => markers_to_keep.set(m.place.id, 0)) 
        } else {
      //    this.clearMarkers()
        }

        console.log(markers_to_delete, markers_to_keep)
        // remove necesary markers
        markers_to_delete.forEach(m => m.marker.setMap(null))
        
        // update all markers ....
        this.updateMarkers(this.state.map, markers_to_keep)
      }

      // reload subways on address change
      console.log('ADDRESS CHANGE', prevProps.address, this.props.address)
      if (prevProps.address != this.props.address) {
 
        this.loadNearbySubways()
      }
    }
    // update geojson
    if (this.state.map !== undefined) {
      if (this.props.data_range !== prevProps.data_range) {
        if (this.state.display_cartography)
          await this.renderCartography()
      }   
    }
  }

  onUpdateTradeZoneBounds(tradeZone_bounds) {
    this.props.onUpdateTradeZoneBounds(tradeZone_bounds)
  }

  async loadTradeZoneCartography() {
    if (!this.state.cartographyLoaded) {
      console.log('fetching bounds', this.props.isCity)
      await getTradeZoneBounds(this.props.isCity, this.props.address.coords).then(res => this.onUpdateTradeZoneBounds(res))
      console.log('Fetching cartography', this.props.tradeZone_bounds)
      await getTradeZoneCartography(this.props.address.state.toLowerCase(), this.props.tradeZone_bounds).then((data) => {
        let mCartography = Object.assign({}, this.state.cartography)
        mCartography.tradezone = data
        this.setState({ cartography : mCartography})
        this.setState({ cartographyLoaded : true})
        this.renderCartography()
      })
   }
  }

  initCache() {
     for (let type of BUSINESS_TYPES.concat(POI_TYPES).concat(['establishment'])) {
       if (type == 'hotels /lodging') type = 'lodging'
       this.state.places_cache.set(type, new Map())
     }
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
  }
    
  async loadDefaultPlaces() {
   
    let response = await getNearby(this.props.address, this.state.business_type, (data, token) => {
      console.log('LOAD DEFAULTS', data)
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      for (let place of morePlaces) {
        if (!this.state.places_cache.get(this.state.business_type).has(place.place_id)) {
          this.state.places_cache.get(this.state.business_type).set(place.place_id, place)
        } 
      }
      this.state.tokens_cache.set(this.state.business_type, token)
        if (this.props.address.place.types.includes('establishment')) {
          this.getPlaceDetails(this.state.map, this.props.address.place.place_id, (details) => {
            let place = this.props.address.place
            place.icon = details.icon
            place.name = details.name
            place.id = details.id
            this.state.place_details.set(place.id, details)
            this.setState({ addressPlace : place})
            this.onUpdatePlaces(data)
          })
        } else this.onUpdatePlaces(data)
      this.setState({ places_count : 20 })
    })     
  }

  loadPlaceType(type) {
    let cached_places = Array.from(this.state.places_cache.get(type).values())
    console.log('cached places', cached_places.length, cached_places)
    if (cached_places.length == 0) {
      // if not cached load places
      getNearby(this.props.address, type, (data, token) => {
   //     var morePlaces = this.props.places.concat(data)
        console.log('loaded data', data)
        this.setState({places: data})

        // cache loaded places
        for (let place of data) {
          if (!this.state.places_cache.get(type).has(place.place_id)) {
            this.state.places_cache.get(this.state.business_type).set(place.place_id, place)
          } 
        }
          this.state.tokens_cache.set(type, token)
          this.onUpdatePlaces(data)
        })
      // if already cached 
    } else {
      this.setState({places: cached_places.slice(0, 20)})
      this.onUpdatePlaces(cached_places.slice(0,20))
    }
  }

  loadAllPlaces() {
    getNearby(this.props.address, 'establishment', (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      this.setState({ places_count : 20 })
      this.state.tokens_cache.set('establishment', token)
      this.onUpdatePlaces(data)
    })
  }

  loadMorePlaces(index, hasCallback, callback) {
        let cached_places = Array.from(this.state.places_cache.get(this.state.business_type).values())
        if (cached_places.length > index) {
          var morePlaces = this.state.places.concat(cached_places.slice(index, index + 20))
          this.setState({places: morePlaces}, () => {
            this.onUpdatePlaces(morePlaces)
            if (hasCallback) { callback() }
          })
        } else {
        getPages(this.state.tokens_cache.get(this.state.business_type), (data, token) => {
        this.state.tokens_cache.set(this.state.business_type, token)
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
  async onBusinessFormChange(event) {
    let type = event.target.value.replace(/ /g, '_')
    if (type == 'hotels_/lodging') type = 'lodging'
    else if (type == 'all') type = 'establishment'
    // clear places
    if (type == 'none') {
      this.setState({places_count : 0, 
        business_type_option: event.target.value,
        business_type: type,
        poi : 'none'
      }, () => this.onUpdatePlaces([]))

    } else {
      console.log('load place type', type)
      this.setState({places_count : 20, 
        business_type_option: event.target.value,
        business_type: type,
        poi : 'none'
      })
      this.clearMarkers()
      await this.loadPlaceType(type)
    }
  }

  async onPoiFormChange(event) {
    let type = event.target.value.replace(/ /g, '_')
    if (type == 'hotels_/lodging') type = 'lodging'
    else if (type == 'all') type = 'establishment'

    if (type == 'none') {
        this.setState({places_count : 0, 
          poi: event.target.value,
          business_type : type,
          business_type_option : 'none'
        }, () => this.onUpdatePlaces([]))
      
    } else {
      this.setState({places_count : 20, 
        poi : event.target.value, 
        business_type : type,
        business_type_option : 'none'
      })
      this.clearMarkers()
      await this.loadPlaceType(type)
    }
  }

  clearMarkers = () => {
    // clear markers 
    let updatedMarkers = new Map()
    this.state.markers.forEach((e, i) => {
       e.marker.setMap(null)
       if (i < this.props.places.length) 
          updatedMarkers.set(e.place.id, e)
    })
    this.setState({ markers: updatedMarkers})
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
              this.loadMorePlaces(20, true, ()=> {
                this.loadMorePlaces(40, false)
              })
              
            } else if (this.state.places.length == 40) {
              this.loadMorePlaces(40, false)
            }
            else {
              var places = this.props.places
              places = places.slice(0, 60)
              this.onUpdatePlaces(places)
            }
            break;
      }
  }
  onUpdatePlaces(data) {
    if (this.props.address.place.types.includes('establishment')) {
      let updatedData = [this.state.addressPlace]
      data.map(e => {
        if (e.place_id != this.state.addressPlace.place_id)
          updatedData.push(e)
      })
      this.props.onUpdatePlaces(updatedData)
    } else 
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
      if (this.props.isCity) {
        let circle1Distance = 804 // 0.25 mi
        let circle2Distance = 1608 // 0.5 mi
         const circle1 = renderCircle(circle1Distance, "#ffff00", this.state.map, this.state.center) 
         const circle2 = renderCircle(circle2Distance, "#0000ff", this.state.map, this.state.center) 
          // to-do cleanup, add label
        let points = getPoints(this.state.center, 0.804, 1)
        renderComplexMarker('circle1', points[0], this.state.map, '0.25 mi', YELLOW_DOT_25, new google.maps.Point(60, 60))
        points = getPoints(this.state.center, 1.604, 1)
        renderComplexMarker('circle2', points[0], this.state.map, '0.5 mi', BLUE_DOT_05, new google.maps.Point(60, 60))
     /* 
        let points1 = getPoints(this.state.center, 0.5, 15)
        let points2 = getPoints(this.state.center, 0.375, 12)
        let points3 = getPoints(this.state.center, 0.25, 9)
        let points4 = getPoints(this.state.center, 0.125, 6)
        let testPoints = points1.concat(points2).concat(points3).concat(points4)
        testPoints.forEach((e, i) => {
          renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, GREEN_MARKER)
        })
      */
      } else if (!this.props.isCity) {
        let circle1Distance = 4828 // 3 mi
        let circle2Distance = 8046 // 5 mi
        const circle1 = renderCircle(circle1Distance, "#ffff00", this.state.map, this.state.center) 
        const circle2 = renderCircle(circle2Distance, "#0000ff", this.state.map, this.state.center) 
        // to-do cleanup, add label
          let points = getPoints(this.state.center, 4.8225, 1)
          renderComplexMarker('circle1', points[0], this.state.map, '3 mi', YELLOW_DOT_3, new google.maps.Point(60, 60))
          points = getPoints(this.state.center, 8.046, 1)
          renderComplexMarker('circle2', points[0], this.state.map, '5 mi', BLUE_DOT_5, new google.maps.Point(60, 60))
      }
    /*  
      let points1 = getPoints(this.state.center, 1.60940, 15)
      let points2 = getPoints(this.state.center, 1.35, 30)
      let points3 = getPoints(this.state.center, 1.07, 20)
      let points4 = getPoints(this.state.center, 0.8, 25)
      let points5 = getPoints(this.state.center, 0.534, 15)
      let points6 = getPoints(this.state.center, 0.267, 6)
      let points = points1.concat(points2).concat(points3).concat(points4).concat(points5).concat(points6)
      console.log(points)
      points.forEach((e, i) => {
        renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, GREEN_MARKER)
      })
    */
  }

  onHandleCenter= () => {
    this.setState({ center : this.props.center })
    if (this.state.siteView) this.setState({siteView: false})
  }
  
  updateMapCenter(coords)  {
    this.setState({
        center: coords
    });
} 

   // markers
  updateMarkers = (map, markers_to_keep) =>  {
    let markerMap = this.state.markers
    Array.from(this.props.places).map((place, i) => {
    var id= place.id
    var img = ''

    // filter preexisting places
    if (!markers_to_keep.has(id)) { 
        if (place.place_id == this.props.address.place.place_id) {
          img = BLUE_MARKER
        }
        else if (this.props.business_type.type != 'residential' && this.props.business_type.type == this.state.business_type) {
          img = RED_MARKER
        } else {
          img = YELLOW_MARKER
        }
        let marker = renderMarker(i, place.geometry.location, map, place.name, img)
        markerMap.set(id, {marker: marker, place: place})
    }
    })
  this.setState({ markers : markerMap})
  this.updateInfoWindow(map)
}

updateInfoWindow = (map) => Array.from(this.state.markers, ([key, value]) =>  {

  // to close window on exit
  value.marker.addListener('click',  () => {
       this.onUpdateActivePlace(value.place)
        this.updatePlaceDetails(() => {
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
    fields: ['id', 'name', 'icon', 'formatted_address', 'opening_hours', 'website', 'price_level']
  };
  
     // get details
    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        callback(place)
      } else {
        console.error('error', status)
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
  if (marker.place.place_id == this.props.address.place.place_id) {
    img = BLUE_MARKER
  }
  else if (marker.place.id === this.props.active_place.id) {
    img = GREEN_MARKER
  } else if (!this.props.business_type.type == 'residential' && this.props.business_type.type == this.state.business_type){
    img = RED_MARKER
  } else {
    img = YELLOW_MARKER
  }
  marker.marker.setIcon(img)
}

handleSwitch = (checked) => {
  if (checked) {
    this.renderCartography()
  } else {
    this.clearCartography()
  }
}

onHandleSite = (checked) => {
  if (checked) {
    this.setState({ siteView : true})
  } else {
    this.setState({ siteView : false})
  }
}


handleChange = (event) => {
  this.setState({ center : event.center})
}

// subways 
onUpdateTransportation = (transportation) => {
  this.props.onUpdateTransportation(transportation)
}

loadNearbySubways = async () => {
  let type = 'subway_station'

    getNearby(this.props.address, type, async (data, token) => {

        // cache loaded places
        for (let place of data) {
          if (!this.state.places_cache.get(type).has(place.place_id)) {
            this.state.places_cache.get(type).set(place.place_id, place)
          } 
        }
          this.state.tokens_cache.set(type, token)

        let subway_data = await getDistancesFromMap(this.state.places_cache.get(type), this.props.center)
        let transportObj = this.props.transportation
        if (transportObj == '') { transportObj = {} }
        transportObj.subways = subway_data
      
        console.log('FIRE SUBWAYS', transportObj)
        this.onUpdateTransportation(transportObj)
    })       
}

generateHeading = () => {
  var sv = new google.maps.StreetViewService();
 // initialize a new panorama API object and point to the element with ID streetview as container
 var panorama = new  google.maps.StreetViewPanorama(document.getElementById('pano'), {position: this.props.center});

    sv.getPanorama({
        location: this.props.center,
        radius: 50
    }, (data, status) => {
      if (status === google.maps.StreetViewStatus.OK) {
  
          var marker_pano = new google.maps.Marker({
              position: this.props.center,
              map: panorama
          });
  
          var heading = google.maps.geometry.spherical.computeHeading(data.location.latLng, marker_pano.getPosition());
  
          panorama.setPov({
              heading: heading,
              pitch: 0
          });
          this.setState({heading: heading})
          console.log('HEADING', heading)
      }
  });
}

// to do add to cache
generateStreetViewMarkers = () => {
  console.log()
}

  render() {
 //  console.log('map props', this.props)
    const apiIsLoaded = (map, maps, center) => {
      this.state.map = map
      if (!this.props.address.place.types.includes('establishment')) {
        let yourBusinessMarker = renderMarker('your_business', center, map, 'Your Business', BLUE_MARKER)
        var content ='<h3>Your ' + this.props.business_type.type.toString() +'</h3>'
          yourBusinessMarker.addListener('click', () => {
            infoWindow.setContent(content)
            infoWindow.open(map, yourBusinessMarker)
            infoWindow.marker = yourBusinessMarker
        })
     }
      this.updateRadii()
      this.loadCartography()  
      this.generateHeading()
      this.loadDefaultPlaces()
      this.loadNearbySubways()
    }
    

  const MapButtons = () => 
  <div className='map-control_bar'>
    <div style={{ display : 'flex', alignItems: 'center', marginLeft: '2.5%', height: '7.5vh'}}>
      <Button variant="light" onClick={this.onHandleCenter}> 
        Center
      </Button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  marginLeft: '10px'}}>
         <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <p style={{textAlign: 'center', marginBottom: '0', color: 'whitesmoke'}}> Street View on/off</p>
         <SliderSwitch checked={this.state.siteView} switchFunction={this.onHandleSite}></SliderSwitch>
         </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  marginLeft: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <p style={{textAlign: 'center', marginBottom: '0', color: 'whitesmoke'}}> Overlay on/off</p>
         <SliderSwitch checked={true} switchFunction={this.handleSwitch}></SliderSwitch>
         </div>
        </div>
        </div>
        <div style={{ display: 'flex', alignContent: 'center'}}>
         <div>
          <p style={{textAlign: 'center', marginBottom: '0%', color: 'whitesmoke'}}> Businesses</p>
         <Form.Control value={this.state.business_type_option} as="select" name="business_type" onChange={this.onBusinessFormChange} style={{width: '150px', textAlign: 'center', display: 'inline', maxMenuHeight: '200px', }}>
                        <option>none</option>
                        <option>all</option>
                       {BUSINESS_TYPES.map((e, i) => {
                         if (e != 'residential') {
                            return <option key={i}>{e.replace(/_/g, ' ')}</option>
                         }
                       })}
          </Form.Control>
          </div>
          <div>
          <p style={{textAlign: 'center', marginBottom: '0%', color: 'whitesmoke'}}> Places of Interest</p>
         <Form.Control value={this.state.poi} as="select" name="poi" onChange={this.onPoiFormChange} style={{width: '150px', textAlign: 'center', display: 'inline'}}>
                       <option>none</option>
                       <option>all</option>
                       {POI_TYPES.map((e, i) => {
                         return <option key={i}>{e.replace(/_/g, ' ')}</option>
                       })}
          </Form.Control>
          </div>
          </div>
          <div style = {{ marginRight: '2.5%'}}>
          <p style={{textAlign: 'center', marginBottom: '0%', color: 'whitesmoke'}}> Results</p>
          <Form.Control value={this.state.places_count} as="select" name="places_count" onChange={this.onPlacesCountChange} style={{ textAlign: 'center', display: 'inline'}}>
                        <option>20</option>
                        <option>40</option>
                        <option>60</option>
          </Form.Control>
          </div>
         </div>


    // init street view only after heading is calculated
    let streetView = <></>
    if (this.state.heading != undefined) {
      streetView = <ReactStreetview
      ref={this.streetView}
      apiKey={GOOGLE_KEY}
      streetViewPanoramaOptions={{
        position: {lat: this.props.center.lat, lng: this.props.center.lng},
        pov: {heading: this.state.heading, pitch: 0},
        zoom: 1,
        source: google.maps.StreetViewSource.OUTDOOR
      }}
      width={'400px'}
      height={'400px'}
    />
  }

    return (
      // Important! Always set the container height explicitly
      // to-do export styling to .css 
      <div className='map_container'>
         <MapButtons></MapButtons>
        
      <div style={{height: this.props.height}}>
        {
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
          <div style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0}}>
           <GoogleMapReact
            ref={this.myRef}
              bootstrapURLKeys={{ key: GOOGLE_KEY}}
              center={this.state.center}
              zoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals={true}
              layerTypes={['TrafficLayer', 'TransitLayer']}
              id={'map'}
              onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state.center)}
              options= {this.state.mapOptions}
              resetBoundsOnResize = {true}
              onChange={this.handleChange}
            >
        </GoogleMapReact>
        </div>
          {this.state.siteView && 
          <div style={{
            backgroundColor: '#eeeeee',
            width: '40%',
            height: '40%',
          position: 'absolute', top: 0, left: 0
          }}>
            {streetView}
          </div>}
        </div>}
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
  isCitySelector,
  tradeZoneBoundsSelector,
  transportationSelector, 
  (places, active_place, address, business_type, zip, state, tract, data_range, isCity, tradeZone_bounds, transportation) => ({
    places, 
    active_place,
    address,
    business_type,
    zip,
    state, 
    tract,
    data_range,
    isCity,
    tradeZone_bounds,
    transportation
  })
);
 
const mapActionsToProps = {
  onUpdatePlaces: updatePlaces,
  onUpdateActivePlace: updateActivePlace,
  onUpdateTract: updateTract,
  onUpdateTradeZoneBounds: updateTradeZoneBounds,
  onUpdateTransportation: updateTransportation
};

export default connect(mapStateToProps, mapActionsToProps) (SimpleMap);