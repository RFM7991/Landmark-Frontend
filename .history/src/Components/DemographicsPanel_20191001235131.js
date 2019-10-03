import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { getAge, getIncome, getSocial, getZipStats  } from '../Requests/city-requests' 
import { getTradeZoneStats } from '../Requests/tradezone-requests'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updateDataRange } from '../Actions/dataRange-actions'
import { updateStats } from '../Actions/stats-actions'
import { isCitySelector, tractSelector, addressSelector, dataRangeSelector, tradeZoneBoundsSelector, statsSelector } from '../Reducers/selectors';
export const ZIP = 'zip code tabulation area'
export const TRADE_ZONE = 'tradeZone'

class DemographicsPanel extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            statsLoaded : false
         }

        this.onUpdateDataRange = this.onUpdateDataRange.bind(this)
        this.onUpdateStats = this.onUpdateStats.bind(this)
        this.getZipData = this.getZipData.bind(this)
        this.getTradeZoneData = this.getTradeZoneData.bind(this)
    }

   onUpdateDataRange(event) {
    let val = event.target.value
    if (val === 'zip') {
        this.props.onUpdateDataRange(ZIP)
    }
    else if (val == 'tradeZone') {
        this.props.onUpdateDataRange(TRADE_ZONE)
    }
   }

   onUpdateStats(stats) {
       this.props.onUpdateStats(stats)
   }

   async componentDidUpdate(prevProps) {
       console.log('demo update', this.props.tradeZone_bounds, prevProps.tradeZone_bounds)
       if (prevProps.tradeZone_bounds != this.props.tradeZone_bounds && !this.state.statsLoaded && this.state.tradeZoneStats == null) {
           console.log('fetching Stats')
           await this.getTradeZoneData()
       }
   }

    async componentDidMount() {
        await this.getZipData()
    }

    async getZipData() {
       let data = await getZipStats(this.props.lat, this.props.lng)
       this.setState({ zipStats : data })
       let stats = {
           zip : data,
           tradezone : this.props.stats.tradezone
       }
    }

    async getTradeZoneData() {
        console.log(this.props.tradeZone_bounds)
       await getTradeZoneStats(this.props.tradeZone_bounds).then(data => {
        this.setState({tradeZoneStats : data, statsLoaded : true})
        return 
       })
    }
    render() {
        var social_data =  {
            summary: {
                gender : {},
            },
            
            race : {},
            education : {},
            marital_status : {},
            employment : {},
            transportation : {}
        }
        var income_data = {}

        if (this.props.data_range == ZIP) {
            if (this.state.zipStats != null) {
                social_data = this.state.zipStats.social
                income_data = this.state.zipStats.income
            }
        } else if (this.props.data_range == TRADE_ZONE) {
            if (this.state.tradeZoneStats != null) {
                social_data = this.state.tradeZoneStats.social
                income_data = this.state.tradeZoneStats.income
            }
        }

        const NestedCard = ({name, data, key_i}) => {
            return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey={key_i}>
                        {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key_i} >
                    <Card.Body>
                        <div style={{overflowX: "auto", overflowY: "auto", width: "100%"}}>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            {Object.entries(data).map((data, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{data[0]}</td><td>{data[1]}</td>
                                    </tr>
                                );
                                })}
                        </tbody>
                        </Table>
                        </div>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        }
        return (
           <div className={this.props.orientation}>
            <div style={{width: '100hv'}}>
               
            </div>
                <br></br>
                <div style={{ textAlign: 'center'}}>
                    <strong>Demographics</strong>
                  </div>
                  <br></br>
                  <div style = {{display: 'flex'}}>
                  <button className='map-control_button'  onClick={this.onUpdateDataRange} value= {'zip'} style={{margin: 'auto', width: '50%', height: '10%', padding: '0'}}>
                    Zip
                </button>
                <button className='map-control_button'  onClick={this.onUpdateDataRange} value = {'tradeZone'} style={{margin: 'auto', width: '50%', height: '10%', padding: '0'}}>
                    Trade Zone
                </button>
                  <br></br>
                </div>
               <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    General
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            <tr>
                            <td>Business</td><td>{this.props.business_type}</td>
                             </tr><tr>
                             <td>City</td><td>{ this.props.city}</td>
                             </tr><tr>
                             <td>Street</td><td>{this.props.street}</td>
                             </tr><tr>
                            <td>Population</td><td>{social_data.summary.population}</td>
                                </tr><tr>
                            <td>Median Age</td><td>{social_data.summary.median_age}</td>
                                </tr><tr>
                            <td>Median Household Income</td><td>{income_data.median}</td>
                            </tr><tr>
                            <td>Males</td><td>{social_data.summary.gender.males}</td>
                             </tr><tr>
                            <td>Females</td><td>{social_data.summary.gender.females}</td>
                             </tr>
                        </tbody>
                        </Table>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Social
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                        <NestedCard name={"Race"} data={social_data.race} key_i={"0"}></NestedCard>
                        <NestedCard name={"Education"} data={social_data.education} key_i={"1"}></NestedCard>
                        <NestedCard name={"Employment"} data={social_data.employment} key_i={"2"}></NestedCard>
                        <NestedCard name={"Marital Status"} data={social_data.marital_status} key_i={"3"}></NestedCard>
                        <NestedCard name={"Transportation"} data={social_data.transportation} key_i={"4"}></NestedCard>
                        </Accordion>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <NestedCard name={"Income"} data={income_data} key_i={"2"}></NestedCard>
                </Accordion>
           </div>
        );
    }
}

const mapStateToProps = createSelector(
    tractSelector,
    addressSelector,
    dataRangeSelector,
    tradeZoneBoundsSelector,
    statsSelector,
    (tract, address, data_range, tradeZone_bounds, stats) => ({
        tract, address, data_range, tradeZone_bounds, stats
    })
);

const mapActionsToProps = {
    onUpdateDataRange: updateDataRange,
    onUpdateStats: updateStats
};

export default connect(mapStateToProps, mapActionsToProps) (DemographicsPanel);