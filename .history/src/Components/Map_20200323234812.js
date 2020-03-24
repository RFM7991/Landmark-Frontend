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
import { getZipCartography, fetchZipCartography, getTradeZoneCartography, getLoadedTradeZoneCartography } from '../Requests/cartography-requests'
import {updateTract} from '../Actions/tract-actions'
import Form from 'react-bootstrap/Form'
import { getPoints } from '../Helpers/TradeZone'
import { ZIP, TRADE_ZONE} from '../Components/DemographicsPanel'
import { GOOGLE_KEY, google, BUSINESS_TYPES, POI_TYPES } from '../Constants.js'
import { renderCircle, renderMarker, renderComplexMarker, renderInfoContent, BLUE_MARKER, YELLOW_MARKER, GREEN_MARKER, RED_MARKER, BLUE_DOT_05, YELLOW_DOT_25, YELLOW_DOT_3, BLUE_DOT_5 } from './GoogleMapComponents'
import { activeSelector, addressSelector, businessTypeSelector, dataRangeSelector, placesSelector, stateSelector, tractSelector, zipSelector, isCitySelector, tradeZoneBoundsSelector, transportationSelector, geoUnitSelector } from '../Reducers/selectors'
import SliderSwitch from './UI/SliderSwitch'
import Button from 'react-bootstrap/Button';
import { updateTradeZoneBounds } from '../Actions/tradeZoneBoundaries-actions'
import { getCounty } from '../Requests/tradezone-requests'
import ReactStreetview from 'react-streetview';
import { getDistancesFromMap } from '../Helpers/Subways'
import { updateTransportation} from '../Actions/transportation-actions'
import { createTradeZoneCartography } from '../Requests/locations-requests'
import FadeLoader from './UI/FadeLoader'
import GridLoader from './UI/GridLoader'
import { getSubwayTotals, getSubwayLines } from '../Requests/subway-requests';
import { getBlockGroups, getZipCodes, getDefaultZip } from '../Helpers/geojsonReader'

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
      loadingCart : {[ZIP] : true, [TRADE_ZONE] : true},
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
  }

  async componentDidUpdate(prevProps, prevState) {
    // active place change
    if (this.props.active_place !== prevProps.active_place) 
      if (this.props.active_place.toString().length > 0) {
        this.setState({center : this.props.active_place.geometry.location})
        // highlight marker on map
        if (prevProps.active_place.toString().length > 0) {
          this.updateMarker(this.state.markers.get(prevProps.active_place.id))
        }
        this.state.markers.get(this.props.active_place.id).marker.setIcon(GREEN_MARKER)
        google.maps.event.trigger(this.state.markers.get(this.props.active_place.id).marker, 'click')
      }

    // update markers 
    if (this.props.places !== prevProps.places && !(!this.state.siteView && prevState.siteView)) {
      if (this.state.map != undefined) {
        let all_markers =  Array.from(this.state.markers.values())
        let markers_to_delete = [];
        let markers_to_keep = new Map(); 

        if (prevProps.places.length > this.props.places.length) { 
          markers_to_delete = all_markers.slice(this.props.places.length, prevProps.places.length)
          all_markers.slice(0, this.props.length).forEach(m => markers_to_keep.set(m.place.id, 0)) // set placeholder, actual value not needed
        } 
        else if (prevProps.places.length < this.props.places.length) {
   
          let arr = all_markers.slice(0, prevProps.places.length)
          arr.forEach(m => markers_to_keep.set(m.place.id, 0)) 
        } else {
      //    this.clearMarkers()
        }

        // remove necesary markers
        markers_to_delete.forEach(m => m.marker.setMap(null))
        
        // update all markers ....
        this.updateMarkers(this.state.map, markers_to_keep)
      }
    }
    // update geojson
    if (this.state.map !== undefined) {
      if (this.props.data_range !== prevProps.data_range) {
        if (this.state.display_cartography)
          await this.renderCartography()
      }   
    }

    // reload subways on address change
    if (prevProps.address != this.props.address) {
      console.log("ADDRESS CHANGE")
      this.onUpdateTradeZoneBounds([])
      this.clearCartography()
    }

    // show subways on transportation change
    if (prevProps.transportation.showSubways != this.props.transportation.showSubways) {
          this.updatePlacesFromRedux('subway_station', 'subway station', 15)
    }


    // updated tz bounds from demo panel
    if (prevProps.tradeZone_bounds != this.props.tradeZone_bounds) {
      if (this.props.tradeZone_bounds.length > 0) {
        this.loadTradeZoneCartography()
      }
    }
  }

  onUpdateTradeZoneBounds(tradeZone_bounds) {
    console.log('NEW_BOUNDS_CART', tradeZone_bounds)
    this.props.onUpdateTradeZoneBounds(tradeZone_bounds)
  }

  async loadTradeZoneCartography() {
    if (!this.state.cartographyLoaded) {
      // if address is new entry, calculate bounds, else fetch cartography from db 
  //    if (this.props.address.isNewEntry) {
    if (true) { // DISABLE CACHE
        this.loadNewTradeZoneCart()
      } else {
        let range = 'driving'
        if (this.props.isCity) range = 'walking'
        let data = await getLoadedTradeZoneCartography(this.props.address.place.place_id, range)
        console.log('LOADED CART', data)
        if (data.length == 0) { // if not found load new
          this.loadNewTradeZoneCart()
        } else {
          
          let mCartography = Object.assign({}, this.state.cartography)
       //   mCartography.tradezone = data[0].cartography
         let collection = []
          data.forEach(e => {
            console.log('HERE', e.cartography)
            e.cartography.forEach(featureSet => {collection.push(featureSet)})
          })
          mCartography.tradezone = collection
          this.setState({ cartography : mCartography, cartographyLoaded : true, loadingCart : {...this.state.loadingCart, [TRADE_ZONE] : false }})
          this.setState({ cartographyLoaded : true})
        }
      }
   }
  }

  loadNewTradeZoneCart = async () => {
    // get tz bounds and push to redux
  console.log('CURRENT_BOUNDS', this.props.tradeZone_bounds, typeof this.props.tradeZone_bounds)

    // get new tz cart with bounds 
    let data;
    switch (this.props.geo_unit) {
      case 'zip' : data = getZipCodes(this.props.tradeZone_bounds, this.props.address.state); break;
      case 'tract' : data =  getTracts(this.props.tradeZone_bounds, this.props.address.state); break;
      //data = await getTradeZoneCartography(this.props.address.state.toLowerCase(), this.props.tradeZone_bounds); break;
      case 'block' : data = getBlockGroups(this.props.tradeZone_bounds, this.props.address.state); break;
      default : break;
  }
     
      let mCartography = Object.assign({}, this.state.cartography)
      mCartography.tradezone = data
      await this.setState({ cartography : mCartography, cartographyLoaded : true, loadingCart : {...this.state.loadingCart, [TRADE_ZONE] : false } })
      this.renderCartography()
      // upload new location tz cartography
      let range = 'driving'
      if (this.props.isCity) range = 'walking'
      let tzCartUploadResults = await createTradeZoneCartography(this.props.address.place.place_id, data, range)
      console.log('tzCartUploadResults', tzCartUploadResults)
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
     console.log("CART_TEST", this.props.data_range)
      // render cartography
      if (this.props.data_range == ZIP) {
        if (this.state.cartography.zip !== undefined)
          this.state.cartography.zip.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
      } 
      else if (this.props.data_range == TRADE_ZONE) {
        if (this.state.cartography.tradezone !== undefined) {
          this.state.cartography.tradezone.forEach(featureSet => this.state.map.data.addGeoJson(featureSet))
       } else {
         setTimeout(() => this.renderCartography(), 100)
       }
    }
    
  }

   async loadCartography() {
   //  getZipCartography(this.props.address.state.toString().toLowerCase(), this.props.address.zip).then(async (data) => {
     let data = getDefaultZip(this.props.address.zip, this.props.address.state.toString().toLowerCase())
       console.log('444', data, this.props.address.state.toString().toLowerCase(), this.props.address.zip)
       let mCartography = Object.assign({}, this.state.cartography)

      // if not found in db load from census sdk
      if (data.length <= -1) {
        let fetchedCart = await fetchZipCartography(this.props.address.coords.lat,  this.props.address.coords.lng)
        console.log('FETCHED ZIP CART ', fetchedCart)
        mCartography.zip = fetchedCart
      } else {
        mCartography.zip = data
      }
      
      this.setState({cartography : mCartography, loadingCart : {...this.state.loadingCart, [ZIP]: false}})
      // init geojson rendering
      this.renderCartography()
  
  }
    
  async loadDefaultPlaces() {
   
    let response = await getNearby(this.props.address, this.state.business_type, (data, token) => {
      var morePlaces = this.props.places.concat(data)
      this.setState({places: morePlaces})
      for (let place of morePlaces) {
        if (!this.state.places_cache.get(this.state.business_type).has(place.place_id)) {
          this.state.places_cache.get(this.state.business_type).set(place.place_id, place)
        } 
      }
      this.state.tokens_cache.set(this.state.business_type, token)
        if (this.props.address.place.types.includes('establishment')) {
          this.getPlaceDetails(this.state.map, this.props.address.place.place_id, async (details) => {
            let place = this.props.address.place
            place.icon = details.icon
            place.name = details.name
            place.id = details.id
            this.state.place_details.set(place.id, details)
            await this.setState({ addressPlace : place})
            this.onUpdatePlaces(data)
          })
        } else this.onUpdatePlaces(data)
      this.setState({ places_count : 20 })
    })     
  }

  loadPlaceType(type, index) {
    let cached_places = Array.from(this.state.places_cache.get(type).values())
    if (cached_places.length == 0) {
      // if not cached load places
      getNearby(this.props.address, type, (data, token) => {
   //     var morePlaces = this.props.places.concat(data)
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
      if (index == undefined) {
        this.setState({places: cached_places.slice(0, 20)})
        this.onUpdatePlaces(cached_places.slice(0,20))
      } else {
        this.setState({places: cached_places.slice(0, index)})
        this.onUpdatePlaces(cached_places.slice(0, index))
      }
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

    console.log(type, event.target.value)
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

  updatePlacesFromRedux = async (type, display_value, index) => {
    if (type == 'hotels_/lodging') type = 'lodging'
    else if (type == 'all') type = 'establishment'

    if (type == 'none') {
        this.setState({places_count : 0, 
          poi: display_value,
          business_type : type,
          business_type_option : 'none'
        }, () => this.onUpdatePlaces([]))
      
    } else {
      this.setState({places_count : index+1, 
        poi : display_value, 
        business_type : type,
        business_type_option : 'none'
      })
      this.clearMarkers()
      await this.loadPlaceType(type, index)
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

  async updateRadii() {
    
    let county = await getCounty(this.state.center)
    console.log("COUNTY?", county, county[0].state == '34' || (county[0].state == '36' && (county[0].county == '103' || county[0].county == '059')))
    if (county[0].state == '34' || (county[0].state == '36' && (county[0].county == '103' || county[0].county == '059'))) {
          // NJ, Long Island    
          let circle1Distance = 4828 // 3 mi
          let circle2Distance = 8046 // 0.5 mi
          const circle1 = renderCircle(circle1Distance, "#ffff00", this.state.map, this.state.center) 
          const circle2 = renderCircle(circle2Distance, "#0000ff", this.state.map, this.state.center) 
          // to-do cleanup, add label
          let points = getPoints(this.state.center, 4.828, 1)
          renderComplexMarker('circle1', points[0], this.state.map, '3 mi', YELLOW_DOT_3, new google.maps.Point(60, 60))
          points = getPoints(this.state.center, 8.046, 1)
          renderComplexMarker('circle2', points[0], this.state.map, '5 mi', BLUE_DOT_5, new google.maps.Point(60, 60))
   
          // render test points
          points = getPoints(this.state.center, 4.8225, 1)
          let counter = 1
          let divisor = 10;
          let increment = 4.828 / divisor //4.828 = exact 3 miles 0.804672
                
                for (let i=1; i <= divisor; i++) {
                    points = points.concat(getPoints(this.state.center, i*increment, counter*8))
                    counter+=1
                }
  
          points.forEach((e, i) => {
         //   renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, GREEN_MARKER)
          })
        
          let outerRing = getPoints(this.state.center, 8, 80)
          outerRing.forEach((e,i) => {
         //  renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, RED_MARKER)
          })
        return;
    }
   

      if (this.props.isCity) {
        // WALKING
        let circle1Distance = 402 // 0.25 mi
        let circle2Distance = 804 // 0.5 mi
         const circle1 = renderCircle(circle1Distance, "#ffff00", this.state.map, this.state.center) 
         const circle2 = renderCircle(circle2Distance, "#0000ff", this.state.map, this.state.center) 
        // to-do cleanup, add label
        let points = getPoints(this.state.center, 0.402, 1)
        renderComplexMarker('circle1', points[0], this.state.map, '0.25 mi', YELLOW_DOT_25, new google.maps.Point(60, 60))
        points = getPoints(this.state.center, 0.804, 1)
        renderComplexMarker('circle2', points[0], this.state.map, '0.5 mi', BLUE_DOT_05, new google.maps.Point(60, 60))
      
        // render test points
        let divisor = 4;
        let increment = 0.35 / divisor // 0.2174799
        let counter = 1 
        for (let i=1; i <= divisor; i++) {
            points = points.concat(getPoints(this.state.center, i*increment, counter*8))
            counter+=1
        }
                
        points.forEach((e, i) => {
            renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, GREEN_MARKER)
        })

        let outerRing = getPoints(this.state.center, .800, 50)
        outerRing.forEach((e,i) => {
            renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, RED_MARKER)
        })
      
      } else if (!this.props.isCity) {
        // DRIVING    
        let circle1Distance = 804  // 0.5 mi
        let circle2Distance =  1608 // 3 mi
        const circle1 = renderCircle(circle1Distance, "#0000ff", this.state.map, this.state.center) 
    //  const circle2 = renderCircle(circle2Distance, "#0000ff", this.state.map, this.state.center) 
        // to-do cleanup, add label
        let points = getPoints(this.state.center, 0.804, 1)
        renderComplexMarker('circle1', points[0], this.state.map, '0.5 mi', BLUE_DOT_05, new google.maps.Point(60, 60))
      //  points = getPoints(this.state.center, 1.608, 1)
     //    renderComplexMarker('circle2', points[0], this.state.map, '1 mi', BLUE_DOT_05, new google.maps.Point(60, 60))
 
        // render test points
        points = getPoints(this.state.center, 4.8225, 1)
        let counter = 1
        let divisor = 5;
        let increment = 0.8/ divisor //4.828 = exact 3 miles 0.804672
        
        for (let i=1; i <= divisor; i++) {
            points = points.concat(getPoints(this.state.center, i*increment, counter*8))
            counter+=1
        }

        points.forEach((e, i) => {
       //   renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, GREEN_MARKER)
        })
      
        let outerRing = getPoints(this.state.center, 8, 80)
        outerRing.forEach((e,i) => {
     //    renderMarker(i, e, this.state.map, e.lat + ', ' + e.lng, RED_MARKER)
        })
    }
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
  if (marker == undefined) 
    return; 

  var img = ''
  if (marker.place.place_id == this.props.address.place.place_id) {
    img = BLUE_MARKER
  }
  else if (marker.place.id === this.props.active_place.id) {
    img = GREEN_MARKER
  } else if (this.props.business_type.type != 'residential' && this.props.business_type.type == this.state.business_type){
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
  console.log('CHANGE_444', event )
  this.setState({ center : event.center})
}

// subways 
onUpdateTransportation = async (transportation) => {
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
           
          let subwayCoords = []
          Array.from(this.state.places_cache.get(type).entries()).map(([key, value], i) => {
            if ( i > 4) return;
            subwayCoords.push(value.geometry.location)
            console.log('SUBWAYS_XXX', value.name, value.geometry.location)
          })
          
          let subway_data = await getSubwayTotals(subwayCoords)

          // Calculate distance //////
          subway_data.forEach(e => {
            let dist= distance(this.props.address.coords.lat, this.props.address.coords.lng,
              e.data.G_LAT, e.data.G_LNG)
              console.log('DISTANCE', e.name, dist)
              e.distance = dist
          })

          subway_data.sort((x, y) => {
            if (x.distance < y.distance) {
              return -1;
            }
            if (x.distance > y.distance) {
              return 1;
            }
            return 0;
          })
          
          /////////////////////////
          let transportObj = JSON.parse(JSON.stringify(this.props.transportation))
          if (transportObj == '') { transportObj = {}}
      
          // clean up subway data
          let subwayMap = new Map()
          for (let i=0; i< subway_data.length; i++) {
            if (!subwayMap.has(subway_data[i].name)) {
              subwayMap.set(subway_data[i].name, subway_data[i].data)
            } else {
              // check if values are equal, if so arggregate to one location
              if (subwayMap.get(subway_data[i].name).G_TOTAL_ENT == subway_data[i].data.G_TOTAL_ENT) {
                console.log('REPEAT', subwayMap.get(subway_data[i].name), subway_data[i])
                subwayMap.set(subway_data[i].name, 
                  {...subwayMap.get(subway_data[i].name), 
                    G_LINES : subwayMap.get(subway_data[i].name).G_LINES +'-'+ subway_data[i].data.G_LINES 
                  })
              }
            }
          }

          transportObj.subways = subwayMap
          await this.onUpdateTransportation(transportObj)
/*
          // subway lines
          let lines = []
          Array.from(subwayMap.values()).forEach(value=> {
            let resLines = value.G_LINES.split('-')
            console.log('RESLINES', resLines)
            resLines.forEach(e => {
              if (lines.indexOf(e) == -1) {
                lines.push(e)
              }
            })
          })
          console.log('LINES', lines)
          let geo = await getSubwayLines(["A"])
          console.log('GEO', geo)

          geo.forEach(([key, value]) => {
            value.forEach(e => {
              this.state.map.data.addGeoJson(e)
            })
            
          })
          */


/* old distance matrix code
        let subway_data = await getDistancesFromMap(this.state.places_cache.get(type), this.props.center)
        let transportObj = JSON.parse(JSON.stringify(this.props.transportation))
        if (transportObj == '') { transportObj = {}}
    
        transportObj.subways = subway_data
        await this.onUpdateTransportation(transportObj)
        */
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
      }
  });
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
    <div style={{ display : 'flex', alignItems: 'center',height: '7.5vh'}}>
    <Button style={{ fontSize: 12, marginRight: '0.25em',}} onClick={this.props.runJoyRideTutorial}>?</Button>
      <Button style={{ fontSize: 12, marginRight: '0.25em'}} variant="light" onClick={this.onHandleCenter}> 
        Center
      </Button>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  marginTop: '1em', marginLeft: '10px'}}>
         <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <p style={{textAlign: 'center', marginBottom: '0', color: 'whitesmoke'}}> Street View</p>
         <SliderSwitch checked={this.state.siteView} switchFunction={this.onHandleSite}></SliderSwitch>
         </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1em',  marginLeft: '10px'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <p style={{textAlign: 'center', marginBottom: '0', color: 'whitesmoke'}}> Overlay</p>
         <SliderSwitch checked={true} switchFunction={this.handleSwitch}></SliderSwitch>
         </div>
        </div>
        </div>
        <div style={{ display: 'flex', alignContent: 'center', marginLeft: '1em'}}>
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
          {this.state.loadingCart[this.props.data_range] == true && 
          <div style={{
            backgroundColor: 'rgba(238,238,238, 0.55)',
            top: 0,
            right: 0,
            width: '20%',
            position: 'absolute',
            paddingTop: '1em',
            textAlign: 'center'
            }}>
            <FadeLoader color='#123abc' size={10}/>
            <p style={{ color :'black'}}>Loading Overlay</p>
           
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
  geoUnitSelector,
  (places, active_place, address, business_type, zip, state, tract, data_range, isCity, tradeZone_bounds, transportation, geo_unit) => ({
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
    transportation,
    geo_unit
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


function distance(lat1, lon1, lat2, lon2, unit) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
		if (unit=="N") { dist = dist * 0.8684 }
		return dist;
	}
}