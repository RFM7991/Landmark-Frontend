import { connect } from 'react-redux'
import React from 'react'; 
import Table from 'react-bootstrap/Table'
import store from './store'
import { createSelector } from 'reselect';
import { activatePlace } from './Actions/active-actions';

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

  activatePlace(place) {
    console.log('click')
    this.onUpdateActivePlace(play)
  }
  render() {
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
          {this.props.places.map((place, i) => {
              return (
                <tr
                  key={i}
                  onClick={this.activatePlace(place)}
                >
                  <td>{i+1}</td>
                  <td>{place.name}</td>
                  <td>{<img src={place.icon}style={{width: '32px', height: '32px'}} ></img>}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        </div>);
    }
}

const activePlaceSelector = createSelector (
  state => state.active_place,
  active_place => active_place
)

const mapStateToProps = createSelector(
  activePlaceSelector,
  (active_place) => ({
    active_place,
  })
);
 
const mapActionsToProps = {
  onUpdateActivePlace: activatePlace
};


export default connect(mapStateToProps, mapActionsToProps)(PlacesList);