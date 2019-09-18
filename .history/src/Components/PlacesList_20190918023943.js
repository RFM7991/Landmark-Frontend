import { connect } from 'react-redux'
import React from 'react'; 
import Table from 'react-bootstrap/Table'
import store from '../Redux/store'
import { createSelector } from 'reselect';
import { updateActivePlace } from '../Actions/active-actions';

class PlacesList extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = store.getState()
    this.onUpdateActivePlace = this.onUpdateActivePlace.bind(this)
    this.activatePlace = this.activatePlace.bind(this)

    // listen to store
    store.subscribe(() => {
      this.setState(store.getState())
    });
  }

  onUpdateActivePlace(data) {
    this.props.onUpdateActivePlace(data)
  }

  activatePlace(event) {
    console.log('click')
    this.onUpdateActivePlace(event.target.value)
  }
  render() {

    if (this.props.places !== undefined) {
      let places = this.props.places.map((place, i) => {
        return (
          <tr
            key={i}
            onClick={() =>  this.onUpdateActivePlace(place)}
          >
            <td>{i+1}</td>
            <td>{place.name}</td>
            <td>{<img src={place.icon}style={{width: '32px', height: '32px'}} ></img>}</td>
          </tr>
        );
      })
    } else {
      let places = <div></div>
    }

    return (
      <div className='places-list'>
      <br></br>
      <p style={{textAlign: 'center'}} ><strong>Nearby Businesses</strong></p>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {places}
          </tbody>
        </Table>
        </div>);
    }
}

const activePlaceSelector = createSelector (
  state => state.active_place,
  active_place => active_place
)

const placesSelector = createSelector (
  state => state.places,
  places => places
)

const mapStateToProps = createSelector(
  activePlaceSelector, placesSelector,
  (active_place, places) => ({
    active_place,
    places
  })
);
 
const mapActionsToProps = {
  onUpdateActivePlace: updateActivePlace
};


export default connect(mapStateToProps, mapActionsToProps)(PlacesList);