import React from 'react';
import './App.css';
import NavigationBar from './NavigationBar';
import LookUpForm from './LookUpForm';

import { connect } from 'react-redux'
import store from './store'
import SimpleMap from './SimpleMap';
import Table from 'react-bootstrap/Table'
import placesList from './placesList';

class App extends React.Component { 

  constructor(props) {
    super(props)

    this.state = store.getState()

    // listen to store
    store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  render() {
    console.log("store", this.state)
    // AIzaSyAApJlSsL7fsf9ElKRHLLOhEM2pZM00-ho

    if (this.state.address.toString().length > 0) {
      var map = 
      <div className="results-container">
        <div className="location-container">
          <h3>Business Type: {this.state.business_type}</h3>
          <p>{this.state.address.street} {this.state.address.city} {this.state.address.state} {this.state.address.zip}</p>
          <p>latitude = {this.state.address.coords.lat}</p>
          <p>longitude = {this.state.address.coords.lng}</p>
       </div>
       
       <SimpleMap address={this.state.address} center={this.state.address.coords} zoom={12} business_type={this.state.business_type}/>
       
       <placesList></placesList>
      </div>

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
      
      <div>
        <NavigationBar/>
        {map}
        <div className="App">
        <header className="App-header">
          <LookUpForm aRandomProps="whatever"/>
        </header>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
}
export default connect(mapStateToProps) (App);
