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

    componentDidMount() {

    }

    componentDidUpdate() {
        this.generateScore()
    }
    onUpdatePlaces() {

    }

    getPlaceDetails() {

    }

    generateScore() {
        let stats = this.props.stats.tradezone
        if (stats == undefined) return 
        let incomeFit;
        if (stats.income.median < 75000) {
            incomeFit = 1
        } else if (stats.income.median >= 75000 && stats.income.median < 100000) {
            incomeFit = 2
        } else if (stats.income.median < 100000 && stats.income.median < 150000) {
            incomeFit = 3
        } else if (stats.income.median > 150000) {
            incomeFit = 4
        } 

        let incomeScore = 10 - Math.abs(this.props.business.priceLevel - incomeFit)
        console.log('INCOME SCORE',  incomeScore)

        let total = [incomeScore]
        console.log('score', 10 / incomeScore)
        return 10 / incomeScore
    }

    render() {
        console.log('DECSION', this.props)
        let guage;
        if (this.props.stats.tradezone == undefined) return <></> 
        else return (<Guage percent={this.generateScore()}/>)
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

 export default connect(mapStateToProps)(DecisonLogicPanel)