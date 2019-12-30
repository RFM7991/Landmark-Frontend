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
        let header =  <thead>
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
        return (
            <div style={{display: 'block',  flexDirection: 'column', backgroundColor: '#454d55'}}>
                <div style={{marginLeft: '0.5em'}}>
                    <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
                    <ReactTableContainer width='100%' height='300px' customHeader={[header]}>
                        <Table  variant="dark">
                    
                               
                                    <tbody >
                                        <SubwaysRows transportation={this.props.transportation}/>
                                </tbody>
                            </Table>
                     </ReactTableContainer>
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