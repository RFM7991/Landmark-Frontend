import React, { Component, Text, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import { getAge, getIncome, getSocial, getZipStats, getZipAgeStats  } from '../Requests/city-requests' 
import { getTradeZoneStats } from '../Requests/tradezone-requests'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updateDataRange } from '../Actions/dataRange-actions'
import { updateStats } from '../Actions/stats-actions'
import { isCitySelector, tractSelector, addressSelector, dataRangeSelector, tradeZoneBoundsSelector, statsSelector } from '../Reducers/selectors';
import Button from 'react-bootstrap/Button'
export const ZIP = 'zip code tabulation area'
export const TRADE_ZONE = 'tradeZone'


class DemographicsPanel extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            statsLoaded : false,
            zipVariant : 'dark',
            tzVariant : 'light'
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
        this.setState({ zipVariant: 'dark', tzVariant: 'light'})
    }
    else if (val == 'tradeZone') {
        this.props.onUpdateDataRange(TRADE_ZONE)
        this.setState({zipVariant: 'light', tzVariant: 'dark'})
    }
   }

   onUpdateStats(stats) {
       this.props.onUpdateStats(stats)
   }

   async componentDidUpdate(prevProps) {
       if (prevProps.tradeZone_bounds != this.props.tradeZone_bounds && !this.state.statsLoaded && this.state.tradeZoneStats == null) {
           console.log('fetching Stats')
           await this.getTradeZoneData()
       }
   }

    async componentDidMount() {
        await this.getZipData()
    }

    async getZipData() {
       let data = await Promise.all([getZipStats(this.props.lat, this.props.lng), getZipAgeStats(this.props.lat, this.props.lng)])
        data = {
            social: data[0].social,
            income: data[0].income,
            age: data[1].age
        }
        console.log('PROMISE', data)
       this.setState({ zipStats : data })
       let stats = {
           zip : data,
           tradezone : this.props.stats.tradezone
       }
       this.onUpdateStats(stats)
    }

    async getTradeZoneData() {
       let data = await getTradeZoneStats(this.props.tradeZone_bounds)
       this.setState({tradeZoneStats : data, statsLoaded : true})
       let stats = {
        zip : this.props.stats.zip,
        tradezone : data
        }
         this.onUpdateStats(stats)
    }

    checkForTradeZone = () => {
        return new Promise(resolve => {
            if (this.state.tradeZoneStats == null) {
                let loop = setInterval(()=> {
                    if (this.state.tradeZoneStats != null) {
                        clearInterval(loop)
                        resolve()
                    }
                }, 100)
             } else resolve()
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
        var age_data={}

        if (this.props.data_range == ZIP) {
            if (this.state.zipStats != null) {
                social_data = this.state.zipStats.social
                income_data = this.state.zipStats.income
                age_data = this.state.zipStats.age
            }
        } else if (this.props.data_range == TRADE_ZONE) {
            if (this.state.tradeZoneStats != null) {
                social_data = this.state.tradeZoneStats.social
                income_data = this.state.tradeZoneStats.income
                age_data = this.state.tradeZoneStats.age
                console.log("AGE DATA", age_data)
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
                                let entry = data[0]
                                if (name == 'Income') {
                                  
                                
                                    if (i > 1) {
                                        entry = entry.replace(/_/g, '-')
                                        let num1 = entry.substring(1, entry.lastIndexOf('-')).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        let num2 = entry.substring(entry.lastIndexOf('-')+1, entry.length).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                        entry =  '$'+num1+'-'+num2
                                    } else {
                                        entry = entry.replace(/_/g, ' ')
                                    }
                                }
                                return (
                                    <tr key={i}>
                                        <td>{entry}</td><td>{formatCommas(data[1])}</td>
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
                <div style={{display: 'flex'}}>
                  <Button variant={this.state.zipVariant} className='map-control_button'  onClick={this.onUpdateDataRange} value= {'zip'} style={{margin: 'auto', width: '50%', height: 35, padding: '0'}}>
                    Zip
                </Button>
                <LoadingButton click={this.onUpdateDataRange} buffer={this.checkForTradeZone} buttonVariant={this.state.tzVariant}/>
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
                            <td>Business</td><td>{this.props.business_type.type}</td>
                             </tr><tr>
                             <td>City</td><td>{ this.props.city}</td>
                             </tr><tr>
                             <td>Street</td><td>{this.props.street}</td>
                             </tr><tr>
                            <td>Population</td><td>{formatCommas(social_data.summary.population)}</td>
                                </tr><tr>
                            <td>Median Age</td><td>{social_data.summary.median_age + ' yrs'}</td>
                                </tr><tr>
                            <td>Median Household Income</td><td>{'$'+formatCommas(income_data.median)}</td>
                            </tr><tr>
                            <td>Males</td><td>{formatCommas(social_data.summary.gender.males)}</td>
                             </tr><tr>
                            <td>Females</td><td>{formatCommas(social_data.summary.gender.females)}</td>
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
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                    Age
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            <tr>
                            <td>Median</td><td>{social_data.summary.median_age + ' yrs'}</td>
                             </tr><tr>
                             <td>Sample Total</td><td>{formatCommas(age_data.TOTAL)}</td>
                             </tr><tr>
                             <td>0-5yrs</td><td>{formatCommas(age_data.ZERO_FIVE)}</td>
                             </tr><tr>
                             <td>5-9yrs</td><td>{formatCommas(age_data.FIVE_NINE)}</td>
                             </tr><tr>
                             <td>10-14yrs</td><td>{formatCommas(age_data.TEN_FOURTEEN)}</td>
                             </tr><tr>
                             <td>15-17yrs</td><td>{formatCommas(age_data.FIFTEEN_SEVENTEEN)}</td>
                             </tr><tr>
                             <td>18-19yrs</td><td>{formatCommas(age_data.EIGHTEEN_NINETEEN)}</td>
                             </tr><tr>
                             <td>20yrs</td><td>{formatCommas(age_data.TWENTY)}</td>
                             </tr><tr>
                             <td>21yrs</td><td>{formatCommas(age_data.TWENTYONE)}</td>
                             </tr><tr>
                             <td>25-29yrs</td><td>{formatCommas(age_data.TWENTYFIVE_TWENTYNINE)}</td>
                             </tr><tr>
                             <td>30-34yrs</td><td>{formatCommas(age_data.THIRTY_THIRTYFOUR)}</td>
                             </tr><tr>
                             <td>35-39yrs</td><td>{formatCommas(age_data.THIRTYFIVE_THIRTYNINE)}</td>
                             </tr><tr>
                             <td>40-45yrs</td><td>{formatCommas(age_data.FORTY_FORTYFOUR)}</td>
                             </tr><tr>
                             <td>45-49yrs</td><td>{formatCommas(age_data.FORTYFIVE_FORTYNINE)}</td>
                             </tr><tr>
                             <td>50-54yrs</td><td>{formatCommas(age_data.FIFTY_FIFTYFOUR)}</td>
                             </tr><tr>
                             <td>55-59yrs</td><td>{formatCommas(age_data.FIFTYFIVE_FIFTYNINE)}</td>
                             </tr><tr>
                             <td>60-61yrs</td><td>{formatCommas(age_data.SIXTY_SIXTYONE)}</td>
                             </tr><tr>
                             <td>62-64yrs</td><td>{age_data.SIXTYTWO_SIXTYFOUR}</td>
                             </tr><tr>
                             <td>65-66yrs</td><td>{age_data.SIXTYFIVE_SIXTYSIX}</td>
                             </tr><tr>
                             <td>67-69yrs</td><td>{age_data.SIXTYSEVEN_SIXTYNINE}</td>
                             </tr><tr>
                             <td>70-74yrs</td><td>{age_data.SEVENTY_SEVENTYFOUR}</td>
                             </tr><tr>
                             <td>75-79yrs</td><td>{age_data.SEVENTYFIVE_SEVENTYNINE}</td>
                             </tr><tr>
                             <td>80-84yrs</td><td>{age_data.EIGHTY_EIGHTYFOUR}</td>
                             </tr><tr>
                             <td>85+yrs</td><td>{age_data.EIGHTYFIVE_UP}</td>
                             </tr>
                        </tbody>
                        </Table>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
           </div>
        );
    }
}

const LoadingButton = (props) => {
    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {
      if (isLoading) {
        props.buffer().then(() => {
          setLoading(false);
        });
      }
    }, [isLoading]);

    const handleClick = (e) =>{
        props.click(e)
        setLoading(true); 
    }
  
    return (
      <Button
        style={{margin: 'auto', width: '50%', height: 35, padding: '0'}}
        variant={props.buttonVariant}
        disabled={isLoading}
        value = {'tradeZone'} 
        onClick={!isLoading ? handleClick : null}
      >
        {isLoading ? 'Loading…' : 'Tradezone'}
      </Button>
    );
  }

  const formatCommas = (value) => {
    if (value == undefined) return ''
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
const mapStateToProps = createSelector(
    /* for above
         {this.income_data == undefined && <NestedCard name={"Income"} data={<Text>Loading..</Text>} key_i={"2"}></NestedCard>}
                {this.income_data != undefined && <NestedCard name={"Income"} data={income_data} key_i={"2"}></NestedCard>}
    */
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