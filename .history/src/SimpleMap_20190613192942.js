import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getNearby, getPages } from './Actions/user-actions'
import './App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from './Actions/places-actions'
import Marker from './Marker.js'
import store from './store'
import { SELECTED, DEFAULT, HOME } from './Marker' 
import ReactDOM from 'react-dom';
import ReactStreetview from 'react-streetview';

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
    this.state={
      places: [],
      business_type: this.props.business_type,
      center: this.props.center
    }

    // listen to store
    store.subscribe(() => {
      this.setState(store.getState(), ()=> {
        console.log('update map', this.state.active_place)
        this.setState({center: this.props.center})
        if (this.state.active_place.toString().length > 0) {
          this.setState({center: this.state.active_place.geometry.location})
        } 
        console.log('map state', this.state)
    })
      
    });

    this.onUpdatePlaces = this.onUpdatePlaces.bind(this);
    this.loadMorePlaces = this.loadMorePlaces.bind(this);
    this.lessPlaces = this.lessPlaces.bind(this);
    this.loadAllPlaces = this.loadAllPlaces.bind(this);
    this.loadMorePlaces = this.loadMorePlaces.bind(this);
    this.loadDefaultPlaces = this.loadDefaultPlaces.bind(this);
    this.exampleRef = React.createRef()
  }

  componentDidMount() {
    console.log('map props', this.props)
    console.log('map state', this.state)
    
    this.loadDefaultPlaces()
    // get nearby places
    // https://developers.google.com/places/web-service/supported_types
  }

  loadDefaultPlaces() {
    getNearby(this.props.address, ' ', this.state.business_type,   1000, (data, token) => {
      this.setState({places: data})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
     //   this.loadMorePlaces()
      })
    })
  }

  loadAllPlaces() {
    getNearby(this.props.address, ' ', 'establishment',   1000, (data, token) => {
      this.setState({places: data})
      this.setState({token: token}, () => {
        this.onUpdatePlaces(data)
     //   this.loadMorePlaces()
      })
    })
  }

  loadMorePlaces() {
    console.log('loading places', this.state)
      if (this.state.places.length < 60) {
        getPages(this.state.token, (data, token) => {
        console.log('token 3', token)
        var morePlaces = this.state.places.concat(data)
        this.setState({places: morePlaces}, () => {
          this.onUpdatePlaces(morePlaces)
      //    this.loadMorePlaces()
        })
      })
    }
  }

  lessPlaces() {
    console.log('less places')
    if (this.state.places.length > 20) {
      var places = this.state.places
      places = places.slice(0, (places.length-20))
      this.setState({places: places})
      this.onUpdatePlaces(places)
    }
  }
  
  onUpdatePlaces(data) {
    this.props.onUpdatePlaces(data)
  }

  render() {
    const apiIsLoaded = (map, maps, center) => {
      console.log(center)
       // radii
      const circle1 = new google.maps.Circle({
        strokeColor: "#00ff00",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#00ff00",
        fillOpacity: 0.3,
        map,
        center: center,
        radius: 800
      });
      const circle2 = new google.maps.Circle({
        strokeColor: "#ffff00",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#ffff00",
        fillOpacity: 0.2,
        map,
        center: center,
        radius: 1609
      });
      const circle3 = new google.maps.Circle({
        strokeColor: "#0D00ff",
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: "#0D00ff",
        fillOpacity: 0.1,
        map,
        center: center,
        radius: 3218
      });
/*
      const panorama = new google.maps.StreetViewPanorama(
        this.exampleRef, {
          position: center,
          pov: {
            heading: 34,
            pitch: 10
          }
        });
        console.log('ref', this.exampleRef)
        map.setStreetView(panorama);
          */
  
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
  const lat = this.state.center.lat
  const lng = this.state.center.lng
  const streetViewPanoramaOptions = {
    position: {lat, lng},
    pov: {heading: 100, pitch: 0},
    zoom: 1
  };

    return (
      // Important! Always set the container height explicitly
      // to-do export styling to .css 
      <div className='map_container'>
        <div className='map-control_bar'>
        <button className='map-control_button'  onClick={this.lessPlaces} style={{margin: 'auto'}}>
          Less
        </button>
        <button className='map-control_button'  onClick={this.loadMorePlaces} style={{margin: 'auto'}}>
          More
         </button>
         
           <button className='map-control_button'  onClick={this.loadDefaultPlaces} style={{ float: 'right'}}>
           Competition
          </button> 
          <button className='map-control_button'  onClick={this.loadAllPlaces} style={{ float: 'right'}}>
           All
          </button> 
         </div>
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
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.props.center)}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            type={HOME}
            show={true}
            title={'Your Business'}
          />
          {Array.from(this.props.places).map((place, i) => {
            // if selected change type
            var type = DEFAULT
            var show = false;
            
            if (this.state.active_place.toString().length > 0) {
              if (place.name.toString() == this.state.active_place.name.toString()) {
                
                type = SELECTED
                show = true
                console.log(place.name, type, show)
              }
            }
          
            return (
              <Marker
                key={i}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                type={type}
                show={show}
                title={place.name}
              />
            );
          })}
        </GoogleMapReact>

        <div style={{
				width: '800px',
				height: '450px',
				backgroundColor: '#eeeeee'
			}}>
				<ReactStreetview
					apiKey={KEY}
					streetViewPanoramaOptions= {{
            position: {this.state.center, this.state.center},
            pov: {heading: 100, pitch: 0},
            zoom: 1
          }}
				/>
			</div>
      </div>
      </div>
    );
  }
}

const placesSelector = createSelector (
  state => state.places,
  places => places
)

const mapStateToProps = createSelector(
  placesSelector,
  (places) => ({
    places,
  })
);
 
const mapActionsToProps = {
  onUpdatePlaces: updatePlaces
};

export default connect(mapStateToProps, mapActionsToProps) (SimpleMap);