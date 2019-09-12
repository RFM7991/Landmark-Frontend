import React from 'react'
import '../css/App.css'
import NavigationBar from './NavigationBar'
import LookUpForm from './LookUpForm'
import DemographicsPanel from './DemographicsPanel'
import { connect } from 'react-redux'
import SimpleMap from './Map'
import PlacesList from './PlacesList'
import * as selectors from '../Reducers/selectors'
import ReactStreetview from 'react-streetview';

import {
  StaticGoogleMap,
  Marker
} from 'react-static-google-map';

import { createSelector } from 'reselect';

const KEY = 'AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho'; 


class App extends React.Component { 

  constructor(props) {
    super(props)
  }

  render() {
    console.log("store", this.props)

    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (this.props.ready) {

      const streetViewPanoramaOptions = {
        position: this.props.address.coords,
        pov: {heading: 0, pitch: 0},
        zoom: 1
      };

      
      var map = 
      <div>
      <div className="results-container">
        <DemographicsPanel 
          business_type={this.props.business_type} 
          street = {this.props.address.street}
          city = {this.props.address.city}
          state = {this.props.address.state}
          zip = {this.props.address.zip}
          lat = {this.props.address.coords.lat}
          lng = {this.props.address.coords.lng}
          orientation = {"demographics-list-vertical "}>
        </DemographicsPanel>
       
       <SimpleMap address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
       
       <PlacesList></PlacesList>
      </div>
      <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
        <StaticGoogleMap size="600x200"  
          maptype='satellite' 
          zoom = '18'
           apiKey={KEY}>
            <Marker.Group label="You" color="brown">
              <Marker location={this.props.address.coords}/>
            </Marker.Group>
          </StaticGoogleMap>
          <ReactStreetview 
            height = '200px'
            width = '600px'
            apiKey={KEY}
            streetViewPanoramaOptions={streetViewPanoramaOptions}
          />
        </div>
    </div>
      var panel = 
       <div>
        <br></br>
          <DemographicsPanel 
            business_type={this.props.business_type} 
            street = {this.props.address.street}
            city = {this.props.address.city}
            state = {this.props.address.state}
            zip = {this.props.address.zip}
            lat = {this.props.address.coords.lat}
            lng = {this.props.address.coords.lng}
            orientation = {"demographics-list-horizontal"}>
          </DemographicsPanel>
        </div>
    }
    return (
      <div>
        <NavigationBar/>
        {map}
        <div className="App">
        <header className="App-header">
          <LookUpForm/>
        </header>
      </div>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectors.userSelector,
  selectors.addressSelector,
  selectors.businessTypeSelector,
  selectors.placesSelector,
  selectors.readySelector,
  (user, address, business_type, ready) => ({
      user,
      address,
      business_type,
      readySelector
  })
);



export default connect(mapStateToProps) (App);
