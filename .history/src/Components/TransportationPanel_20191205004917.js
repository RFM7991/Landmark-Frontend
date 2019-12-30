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
                    <Table  variant="dark">
                            <thead>
                                <tr>
                                    <th><div style={{display: 'flex'}}>
                                        <img src={SubwayIcon} width={50} height={50}/>
                                        <h3 style={{marginLeft: '0.5em', alignSelf: 'flex-end'}}>Subway</h3>
                                    </div>
                                    </th>
                                    <th>123456789</th>
                                    <th>Lines</th>
                                    <th>Yearly Entries</th>
                                    <th>Distance</th>
                                    <th>Walking Time</th>
                                </tr>
                                </thead>
                    </Table>
                    <div style={{maxHeight: '200px', overflowY: 'scroll'}}>
                        <Table  striped hover variant="dark">
                                <tbody>
                                    <SubwaysRows transportation={this.props.transportation}/>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>    
       )
    }
 }
 const SubwaysRows = (props) => {
     console.log('TRANSPORT', props.transportation)
    if (props.transportation.subways == undefined)
        return<></>;

    return (
       props.transportation.subways.map((e,i) => {
           console.log("DATA", e)
            return (
                <tr key={(i)}>
                    <td>{(i+1)}</td>
                    <td>{e.name}</td>
                    <td>{e.data.LINENAME}</td>
                    <td>{e.data.TOTAL_ENT}</td>
                    <td>{e.directions.distance.text}</td>
                    <td>{e.directions.duration.text}</td>
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