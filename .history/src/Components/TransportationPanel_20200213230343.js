import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import SubwayIcon from '../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class TransportationPanel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
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
                <th>Yearly Foot Traffic-In</th>
                <th>Yearly Foot Traffic-Out</th>
                <th>Distance</th>
                <th>Walking Time</th>
            </tr>
        </thead>
        return (
            <div style={{display: 'block',  flexDirection: 'column', padding: '1.5em', width: '100%', backgroundColor: lightBg}}>
                <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
                <ReactTableContainer height={this.state.tableHeight} width='100%' customHeader={[header]}>
                    <Table striped hover variant="dark">
                        {header}
                        <tbody>
                            <SubwaysRows transportation={this.props.transportation}/>
                        </tbody>
                    </Table>
                </ReactTableContainer>
            </div>    
       )
    }
 }
 const SubwaysRows = (props) => {
    if (props.transportation.subways == undefined || props.transportation.subways.length == 0)
        return<></>;
    return (
       Array.from(props.transportation.subways.entries()).map(([name, data],i) => {
           if (i > 3) return;
            return (
                <tr key={(i)}>
                    <td>{(i+1)}</td>
                    <td>{name}</td>
                    <td>{data.G_LINES}</td>
                    <td>{formatCommas(data.G_TOTAL_ENT)}</td>
                    <td>{formatCommas(data.G_TOTAL_EXITS)}</td>
                  
                </tr>
            )
        }) 
    )
    /**
     *   <td>{e.directions.distance.text}</td>
                    <td>{e.directions.duration.text}</td>
     */
}

 
 const mapStateToProps = createSelector(
     selectors.transportationSelector,
    (transportation) => ({
        transportation, 
    })
 )

 const formatCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
}

 export default connect(mapStateToProps)(TransportationPanel)