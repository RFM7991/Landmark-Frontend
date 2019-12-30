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

class App extends React.Component { 

  constructor(props) {
    super(props) 
    this.onUpdateAddress = this.onUpdateAddress.bind(this)
  }

  onUpdateAddress = (address) => {
    this.props.onUpdateAddress(address)
  }
  render() {
    console.log("App", this.props)

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
          <SimpleMap height={'75vh'} address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
          <PlacesList/>
          </div>
          <br></br>
          <ChartsPanel/>\
          <div style={{width: '50%'}}>
            <TransportationPanel/>
          </div>
        </div>
    }

    return (
      <div>
        <Switch>
          <Route
          path={'/:address/:business_type/:distance'}
          render={(({match}) => {
            return <div>
              <NavigationBar/>
              {map}
              <div className="App">
              <header className="App-header">
              <LookUpForm urlParams={match.params}/>
              </header>
            </div>
          </div>
        })}>
        </Route>

        <Route
           path={'/login'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header">
                  <Login/>
                </header>
              </div>
            </div>
          })}>
        </Route>

        <Route
           path={'/'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header">
                  <LookUpForm/>
                </header>
              </div>
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