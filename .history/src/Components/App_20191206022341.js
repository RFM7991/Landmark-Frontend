import React from 'react'
import '../css/App.css'
import NavigationBar from './NavigationBar'
import LookUpForm from './LookUpForm'
import DemographicsPanel from './DemographicsPanel'
import { connect } from 'react-redux'
import SimpleMap from './Map'
import PlacesList from './PlacesList'
import * as selectors from '../Reducers/selectors'
import { createSelector } from 'reselect';
import ChartsPanel from './ChartsPanel'
import { BrowserRouter as Router, Route, Link, Switch,  Redirect,  } from 'react-router-dom';
import Login from './login'
import { updateAddress } from '../Actions/address-actions';
import TransportationPanel from './TransportationPanel'
import Footer from './Footer'
import skylineBackground from '../images/modern-skyline.jpg'
import Joyride from 'react-joyride';

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class App extends React.Component { 

  constructor(props) {
    super(props) 
    this.onUpdateAddress = this.onUpdateAddress.bind(this)
    this.state = {
      steps: [
        {
          target: '.map_container ',
          content: 'This another awesome feature!',
        },
        {
          target: '.map-control_bar ',
          content: 'This another awesome feature!',
        }
      ]
    }
  }

  onUpdateAddress = (address) => {
    this.props.onUpdateAddress(address)
  }
  render() {
  //  console.log("App", this.props)

    if (this.props.ready) {
    
      var map = <div>
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
          <SimpleMap height={'72.2vh'} address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
          <PlacesList/>
          </div>
          <br></br>
          <ChartsPanel/>
          <TransportationPanel/>
        </div>
    }

    return (
      <div>
        <Switch>
          <Route
          path={'/:address/:business_type/:distance'}
          render={(({match}) => {
            return <div style={{backgroundColor: darkBg}}>
              <NavigationBar/>
              <Joyride 
              steps={this.state.steps} 
              continuous={true}
              showProgress={true}
              showSkipButton={true}
              run={true}
            />
              {map}
              <div className="App" >
              <header className="App-header" style={{backgroundColor: darkBg}}>
              <LookUpForm urlParams={match.params}/>
              </header>
            </div>
            <Footer/>
          </div>
        })}>
        </Route>

        <Route
           path={'/login'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{backgroundColor: darkBg}}>
                  <Login/>
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>

        <Route
           path={'/'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{
                  backgroundImage: `url(${skylineBackground})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%', 
                  opacity: '1',
                }}>
                  <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(26,28,41, 0.4)', zIndex: 1}}></div>
                  <h1 style={{zIndex: 2, fontSize: '58px', fontWeight: 'bold', fontFamily: 'Tahoma, Geneva, sans-serif' }}>Landmark</h1>
                  <br></br>
                  <h3 style={{zIndex: 2}}>Commercial Real Estate Consultation for All</h3>
                    <LookUpForm/>
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>
      </Switch>
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  selectors.addressSelector,
  selectors.businessTypeSelector,
  selectors.readySelector,
  selectors.isCitySelector,
  (address, business_type, ready, isCity) => ({
      address,
      business_type,
      ready,
      isCity
  })
);

const mapActionsToProps = {
  onUpdateAddress: updateAddress
}

export default connect(mapStateToProps, mapActionsToProps) (App);
