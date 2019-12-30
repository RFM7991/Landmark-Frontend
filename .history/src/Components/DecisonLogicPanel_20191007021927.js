import React from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updatePlaces } from '../Actions/places-actions' 

class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
        this.getPlaceDetails = this.getPlaceDetails.bind(this)
    }

    onUpdatePlaces() {

    }

    getPlaceDetails() {
        var service = new google.maps.places.PlacesService(map);
        var request = {
          placeId: place_id,
          fields: ['formatted_address', 'opening_hours', 'website', 'price_level']
        };
        
           // get details
          service.getDetails(request, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              callback(place)
            } else {
              console.log('error', status)
            }
          });
    }

    render() {
        console.log('DECSION', this.props)
       return(
        <div>
            <div style={{width: '100%', height: '100%'}}>
                <Guage percent={0.50}/>
            </div>
        </div>
       )
    }
 }
 
 const mapStateToProps = createSelector(
     selectors.businessTypeSelector,
    selectors.placesSelector,
    (business, places) => ({
        business, 
        places
    })
 )

 const mapActionsToProps = {
    onUpdatePlaces : updatePlaces
 }

 export default connect(mapStateToProps)(DecisonLogicPanel)