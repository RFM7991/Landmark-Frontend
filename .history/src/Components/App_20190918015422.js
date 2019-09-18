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
import { StaticGoogleMap, Marker} from 'react-static-google-map';
import { createSelector } from 'reselect';
import { GOOGLE_KEY } from '../Constants'
import { sign } from '../Signing/urlSigner'

class App extends React.Component { 

  constructor(props) {
    super(props)
  }

  render() {
    console.log("store", this.props)
  
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (this.props.ready) {

      console.log('sign',  this.props.address.coords.lat.toString(),  this.props.address.coords.lng.toString(),  '/maps/api/streetview?size=600x200'
      + '&location=' + this.props.address.coords.lat.toString()+ ',' + this.props.address.coords.lng.toString()
      + '&heading=151.78&pitch=-0.76&key=' + GOOGLE_KEY)

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
       
       <SimpleMap height={'75vh'} address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
       
       <PlacesList></PlacesList>
      </div>
      <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
        <StaticGoogleMap size="600x200"  
          maptype='satellite' 
          zoom = '18'
           apiKey={GOOGLE_KEY}>
            <Marker.Group label="You" color="brown">
              <Marker location={this.props.address.coords}/>
            </Marker.Group>
          </StaticGoogleMap>
          <img src= {'https://maps.googleapis.com' 
            + sign('/maps/api/streetview?size=600x200'
            + '&location=' + this.props.address.coords.lat.toString()+ ',' + this.props.address.coords.lng.toString()
            + '&heading=0&pitch=0&sensor=false&key=' + GOOGLE_KEY)}/>
        </div>
    </div>

      var mapTest = 
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
        <div style={{  width: "80%", backgroundColor : 'black', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{ margin: 'auto'}}>
        <StaticGoogleMap size="2200x800"  
          maptype='satellite' 
          zoom = '20'
           apiKey={GOOGLE_KEY}>
            <Marker.Group label="You" color="brown">
              <Marker location={this.props.address.coords}/>
            </Marker.Group>
          </StaticGoogleMap>
          </div>
          </div>
       <PlacesList></PlacesList>
      </div>
      <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'center'}}>
        
          <div style={{ width: '20%', height: '10%'}}>
       <SimpleMap height={'25vh'} address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
       </div>
          
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
  selectors.readySelector,
  (user, address, business_type, ready) => ({
      user,
      address,
      business_type,
      ready
  })
)


export default connect(mapStateToProps) (App);
