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
   
    subwaysRows = () => {
        if (this.props.transportation.subways == undefined)
            return();
        return (
            this.props.transportation.subways.map((e,i) => {
                return (
                    <tr>
                        <td>e</td>
                    </tr>
                )
            }) 
        )
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
                                <tr>
                                    
                                </tr>
                        </tbody>
                    </Table>
                    
                </div>
            </div>    
       )
    }
 }
 
 const mapStateToProps = createSelector(
     selectors.transportationSelector,
    (transportation) => ({
        transportation 
    })
 )

 export default connect(mapStateToProps)(TransportationPanel)