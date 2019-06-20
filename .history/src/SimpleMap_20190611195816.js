import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import blueMarker from './images/blue-marker.png'
import dotMarker from './images/dot-marker.png'
import { getNearby, getPages } from './Actions/user-actions'
import './App.css';
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updatePlaces } from './Actions/places-actions'
import Marker from './Marker.js'

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
      places: []
    }

    this.onUpdatePlaces = this.onUpdatePlaces.bind(this);
    this.loadMorePlaces = this.loadMorePlaces.bind(this);
    this.lessPlaces = this.lessPlaces.bind(this);
  }

  componentDidMount() {
    console.log('map props', this.props)
    console.log('map state', this.state)
  
    // get nearby places
    // https://developers.google.com/places/web-service/supported_types
    getNearby(this.props.address, ' ', 'restaurant',   1000, (data, token) => {
      console.log(data)
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
    if (this.state.places.length > 20) {
      let places = this.state.places
      places.slice(places.length-20, places.length)
      this.setState({places: places})
      this.onUpdatePlaces(places)
    }
  }
  
  onUpdatePlaces(data) {
    this.props.onUpdatePlaces(data)
  }

  render() {
    const apiIsLoaded = (map, maps, center) => {
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

    return (
      // Important! Always set the container height explicitly
      // to-do export styling to .css 
      <div style={{height: '80vh', width: '60%', margin: 'auto'}}>
        <button className='map-control_button'  onClick={this.loadMorePlaces} style={{margin: 'auto'}}>
          Less
        </button>
        <button className='map-control_button'  onClick={this.lessPlaces} style={{margin: 'auto'}}>
          More
         </button>
      <div style={{height: '75vh'}}>

        <GoogleMapReact
          options={mapOptions}
          bootstrapURLKeys={{ key: KEY}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          layerTypes={['TrafficLayer', 'TransitLayer']}
          id={'map'}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.props.center)}
        >
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            imgSrc={dotMarker}
            title={'Your Business'}
          />
          {this.state.places.map((place, i) => {
            return (
              <Marker
                key={i}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
                imgSrc={blueMarker}
                title={place.name}
              />
            );
          })}
        </GoogleMapReact>
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