import React  from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import { updatePlaces } from '../Actions/places-actions' 
import { GOOGLE_KEY, google, BUSINESS_TYPES, POI_TYPES } from '../Constants.js'
import SubwayIcon from '../images/subway.png'
import Table from 'react-bootstrap/Table'

class TransportationPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {

    }

    componentDidUpdate() {
  
    }

    render() {
        return (
            <div style={{display: 'flex',  flexDirection: 'column', backgroundColor: '#454d55'}}>
                <div style={{marginLeft: '0.5em'}}>
                    <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
                    <Table style={{ color: 'whitesmoke'}}>
                        <thead>
                            <tr>
                                <td><div style={{display: 'flex'}}>
                                    <img src={SubwayIcon} width={50} height={50}/>
                                    <h3 style={{marginLeft: '0.5em', alignSelf: 'flex-end'}}>Subway</h3>
                                </div></td>
                            </tr>
                            </thead>
                            <tbody>
                                <SubwaysRows transportation={this.props.transportation}/>
                        </tbody>
                    </Table>
                    
                </div>
            </div>    
       )
    }
 }
 const SubwaysRows = (transportation) => {
     console.log('TRANSPORT', transportation.transportation)
    if (transportation.subways == undefined)
        return<></>;
        console.log('TRANSPORT not und', transportation)
    return (
       transportation.subways.map((e,i) => {
            return (
                <tr>
                    <td>e</td>
                </tr>
            )
        }) 
    )
}

 
 const mapStateToProps = createSelector(
     selectors.transportationSelector,
    (transportation) => ({
        transportation 
    })
 )

 export default connect(mapStateToProps)(TransportationPanel)