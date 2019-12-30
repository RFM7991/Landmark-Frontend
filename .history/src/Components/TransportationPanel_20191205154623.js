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
            tableHeight: '10%'
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        console.log('FIRE SUBWAYS', this.props)
    /*    if (prevProps.transportation.subways != undefined) {
            if (prevProps.transportation.subways != this.props.transportation.subways) {
                this.setState({tableHeight: '220px'})
            }
        }
    */
    }

    render() {
        console.log('TRANSPORTATION PANEL RENDER')
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
            <div style={{display: 'block',  flexDirection: 'column', padding: '1.5em', width: '100%', backgroundColor: lightBg}}>
                <h1 style={{color: 'whitesmoke', }}>Transportation</h1>
                    <Table striped hover variant="dark">
                        {header}
                        <tbody>
                            <SubwaysRows transportation={this.props.transportation}/>
                        </tbody>
                    </Table>
            </div>    
       )
    }
 }
 const SubwaysRows = (props) => {
     console.log('TRANSPORT', props.transportation)
    if (props.transportation.subways == undefined || props.transportation.subways.length == 0)
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
    selectors.addressSelector,
    (transportation, address) => ({
        transportation, address 
    })
 )

 export default connect(mapStateToProps)(TransportationPanel)