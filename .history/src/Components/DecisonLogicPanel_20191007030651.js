import React from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updatePlaces } from '../Actions/places-actions' 
import { GOOGLE_KEY, google, BUSINESS_TYPES, POI_TYPES } from '../Constants.js'

class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
        this.getPlaceDetails = this.getPlaceDetails.bind(this)
        this.generateScore = this.generateScore.bind(this)
    }

    onUpdatePlaces() {

    }

    getPlaceDetails() {

    }

    generateScore() {
        
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