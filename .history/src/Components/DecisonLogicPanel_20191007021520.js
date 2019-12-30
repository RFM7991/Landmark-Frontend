import React from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'

class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
        this.getPlaceDetails = this.getPlaceDetails.bind(this)
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

 getPlaceDetails() {

 }
 
 const mapStateToProps = createSelector(
     selectors.businessTypeSelector,
    selectors.placesSelector,
    (business, places) => ({
        business, 
        places
    })
 )

 export default connect(mapStateToProps)(DecisonLogicPanel)