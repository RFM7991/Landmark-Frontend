import { connect } from 'react-redux'
import React from 'react'; 
import Table from 'react-bootstrap/Table'

class PlacesList extends React.Component {

  constructor(props) {
    super(props)
    
    this.state = store.getState()

    // listen to store
    store.subscribe(() => {
      this.setState(store.getState())
    });
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
          {this.state.places.map((place, i) => {
              return (
                <tr
                  key={i}
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

export default (PlacesList);