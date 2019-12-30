import React from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updatePlaces } from '../Actions/places-actions' 
import { GOOGLE_KEY, google, BUSINESS_TYPES, POI_TYPES } from '../Constants.js'

class TransportationPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentDidUpdate() {
  
    }
   

    render() {
        <div>
            <h1>Transportation</h1>
        </div>
       )
    }
 }
 
 const mapStateToProps = createSelector(
     selectors.businessTypeSelector,
    selectors.placesSelector,
    selectors.statsSelector,
    (business, places, stats) => ({
        business, 
        places,
        stats
    })
 )

 const mapActionsToProps = {
    onUpdatePlaces : updatePlaces
 }

 export default connect(mapStateToProps)(TransportationPanel)