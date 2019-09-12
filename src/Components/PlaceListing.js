import { connect } from 'react-redux'
import React from 'react'; 
import Table from 'react-bootstrap/Table'
import store from '../Redux/store'
import { createSelector } from 'reselect';
import { activatePlace } from '../Actions/active-actions';

class PlacesList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
      return (
          <tr
            key={i}
            onClick={this.activatePlace}
          >
            <td>{i+1}</td>
            <td>{place.name}</td>
            <td>{<img src={place.icon}style={{width: '32px', height: '32px'}} ></img>}</td>
          </tr>
      );
  }
}

export default PlacesList;