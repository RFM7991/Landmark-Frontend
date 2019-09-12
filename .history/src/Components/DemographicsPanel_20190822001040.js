import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import { getPopulation, getAge, getIncome, getSocial,  } from '../Requests/city-requests' 
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { getPoints } from '../Helpers/TradeZone'
import { getTract } from '../Requests/city-requests'
import { getTradeZoneStats } from '../Requests/tradezone-requests'
const ZIP = 'zip code tabulation area',
TRACT = 'tract',
TRADE_ZONE = 'tradeZone'

class DemographicsPanel extends React.Component {
    constructor(props) {
        super(props) 

        this.state = { range : ZIP,
                       incomeDataMap : new Map(),
                       socialDataMap : new Map(),
                       tradeZoneData : null,
                       ageDataMap : new Map(),
                       boundaries : getPoints(this.props.address.coords, 0.402)
                    }

        this.onUpdateRange = this.onUpdateRange.bind(this)
        this.getData = this.getData.bind(this)
    }

   onUpdateRange(event) {
    let val = event.target.value
    if (event.target.value === 'zip') {
        this.setState({range: ZIP})
    } else if (event.target.value == 'tract') {
        this.setState({range: TRACT })
    } else if (event.target.value == 'tradeZone') 
        this.setState({range: TRADE_ZONE })
   }

    componentDidMount() {
        this.getData()
    }

    getData() {
        
       

        getSocial(ZIP, this.props.lat, this.props.lng, (data) => {
          this.setState({socialZip : data})
          getTradeZoneStats(this.props.lat, this.props.lng).then((data) => this.setState({socialTZ : data}))
        /*
          getSocial(TRACT, this.props.lat, this.props.lng, (data) => {
            this.setState({socialTract : data})
          })
        */
        })
        getAge(ZIP, this.props.lat, this.props.lng, (data) => {
            this.setState({ageZip: data})
            getTradeZoneStats(this.props.lat, this.props.lng).then((data) => this.setState({ageTZ : data}))
        /*
            getAge(TRACT, this.props.lat, this.props.lng, (data) => {
                this.setState({ageTract: data})
            })
        */
        })
        getIncome(ZIP, this.props.lat, this.props.lng, (data) => {
            this.setState({incomeZip : data})
            getTradeZoneStats(this.props.lat, this.props.lng).then((data) => this.setState({incomeTZ : data}))
        /*
            getIncome(TRACT, this.props.lat, this.props.lng, (data) => {
                this.setState({incomeTract : data})
             })  
        */
         })  
    }
    render() {
       
        var social_data =  {
            gender : {},
            race : {},
            education : {},
            marital_status : {},
            employment : {},
            transportation : {}
        }
        var income_data = {}
        var age_data = {}


        if (this.state.range == ZIP) {
            if (this.state.socialZip != null) 
                social_data = this.state.socialZip
            if (this.state.incomeZip != null) 
                income_data = this.state.incomeZip
            if (this.state.ageZip != null)
                age_data = this.state.ageZip

        } else if (this.state.range == TRACT) {
            if (this.state.socialTract != null) 
                social_data = this.state.socialTract
            if (this.state.incomeTract != null) 
                income_data = this.state.incomeTract
            if (this.state.ageTract != null)
                age_data = this.state.ageTract
        }
        else if (this.state.range == TRADE_ZONE) {
            if (this.state.socialTZ != null) 
                social_data = this.state.socialTZ
            if (this.state.incomeTZ != null) 
                income_data = this.state.incomeTZ
            if (this.state.ageTZ != null)
                age_data = this.state.ageTZ
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
                  <button className='map-control_button'  onClick={this.onUpdateRange} value= {'zip'} style={{margin: 'auto', width: '33%', height: '10%', padding: '0'}}>
                    Zip
                </button>
                <button className='map-control_button'  onClick={this.onUpdateRange} value = {'tract'} style={{margin: 'auto', width: '33%', height: '10%', padding: '0'}}>
                    Tract
                </button>
                <button className='map-control_button'  onClick={this.onUpdateRange} value = {'tradeZone'} style={{margin: 'auto', width: '33%', height: '10%', padding: '0'}}>
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
                            <td>Population</td><td>{social_data.population}</td>
                                </tr><tr>
                            <td>Median Age</td><td>{social_data.median_age}</td>
                                </tr><tr>
                            <td>Median Household Income</td><td>{income_data.median}</td>
                            </tr><tr>
                            <td>Males</td><td>{social_data.gender.males}</td>
                             </tr><tr>
                            <td>Females</td><td>{social_data.gender.females}</td>
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
                <NestedCard name={"Age"} data={age_data} key_i={"3"}></NestedCard>
                </Accordion>
           </div>
        );
    }
}

const addressSelector = createSelector (
    state => state.address,
    address => address
)

const tractSelector = createSelector (
    state => state.tract,
    tract => tract
)

const mapStateToProps = createSelector(
    tractSelector,
    addressSelector,
    (tract, address) => ({
        tract, address
    })
);

const mapActionsToProps = {
    
};

export default connect(mapStateToProps, mapActionsToProps) (DemographicsPanel);