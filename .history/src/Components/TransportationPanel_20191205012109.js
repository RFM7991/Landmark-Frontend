import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import SubwayIcon from '../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";

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
            <div style={{display: 'block',  flexDirection: 'column', backgroundColor: '#454d55'}}>
                <div style={{marginLeft: '0.5em'}}>
                    <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
       

                    <Table  variant="dark">
                            <thead style={{display: 'block'}}>
                                <tr>
                                    <th>
                                        <div style={{display: 'inline-block'}}>
                                            <img src={SubwayIcon} width={50} height={50}/>
                                        </div>
                                    </th>
                                    <th>Subway</th>
                                    <th>Lines</th>
                                    <th>Yearly Entries</th>
                                    <th>Distance</th>
                                    <th>Walking Time</th>
                                </tr>
                                </thead>
                                <tbody style={{display: 'block', maxHeight: '200px', overflowY: 'scroll'}}>
                                    <SubwaysRows transportation={this.props.transportation}/>
                            </tbody>
                        </Table>
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