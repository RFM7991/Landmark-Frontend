import React, { Component, Text, useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table'
import Accordion from 'react-bootstrap/Accordion'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Card from 'react-bootstrap/Card'
import { getAge, getIncome, getSocial, getZipStats, getZipAgeStats  } from '../Requests/city-requests' 
import { getTradeZoneStats, getLoadedTradeZoneStats } from '../Requests/tradezone-requests'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { updateDataRange } from '../Actions/dataRange-actions'
import { updateStats } from '../Actions/stats-actions'
import { isCitySelector, tractSelector, addressSelector, dataRangeSelector, tradeZoneBoundsSelector, statsSelector } from '../Reducers/selectors';
import Button from 'react-bootstrap/Button'
import { createTradeZoneStats } from '../Requests/locations-requests'
export const ZIP = 'zip code tabulation area'
export const TRADE_ZONE = 'tradeZone'


const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class DemographicsPanel extends React.Component {
    constructor(props) {
        super(props) 

        this.state = {
            statsLoaded : false,
            zipVariant : 'light',
            tzVariant : 'dark'
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
        this.setState({ zipVariant: 'light', tzVariant: 'dark'})
    }
    else if (val == 'tradeZone') {
        this.props.onUpdateDataRange(TRADE_ZONE)
        this.setState({zipVariant: 'dark', tzVariant: 'light'})
    }
   }

   onUpdateStats(stats) {
       this.props.onUpdateStats(stats)
   }

   async componentDidUpdate(prevProps) {
       if (prevProps.tradeZone_bounds != this.props.tradeZone_bounds && !this.state.statsLoaded && this.state.tradeZoneStats == null) {
       //   console.log('fetching Stats')
           await this.getTradeZoneData()
       }
   }

    async componentDidMount() {
        await this.getZipData()
        if (!this.props.address.isNewEntry) {
            await this.getTradeZoneData()
        }
    }

    async getZipData() {
       let json = await Promise.all([getZipStats(this.props.lat, this.props.lng), getZipAgeStats(this.props.lat, this.props.lng)])
        let data = {
            social: json[0].social,
            income: json[0].income,
            age: json[1].age
        }
       this.setState({ zipStats : data })
       let stats = {
           zip : data,
           tradezone : this.props.stats.tradezone
       }
       this.onUpdateStats(stats)
    }

    async getTradeZoneData() {
        console.log('GET TZ DATA', this.props.address.isNewEntry, this.props.tradeZone_bounds )
        // load tz stats from db if not a new entry 
        if (this.props.address.isNewEntry) {
           this.loadNewTradeZoneStats()
        } else {
            let data = await getLoadedTradeZoneStats(this.props.address.place.place_id, this.props.data_range)
            console.log('LOADED STATS', data)
            if (data == undefined) {
                this.loadNewTradeZoneStats()
            } else {
            // set internal state
            this.setState({tradeZoneStats : data.stats, statsLoaded : true})
            let stats = {
                zip : this.props.stats.zip,
                tradezone : data.stats
            }
            this.onUpdateStats(stats)
            }
        }  
    }

    loadNewTradeZoneStats = async () => {
        let data = await getTradeZoneStats(this.props.tradeZone_bounds)

        // set internal state
        this.setState({tradeZoneStats : data, statsLoaded : true})
        let stats = {
            zip : this.props.stats.zip,
            tradezone : data
        }
        this.onUpdateStats(stats)

        // post new TZ stats to db if new entry
        let res = await createTradeZoneStats(this.props.address.place.place_id, data)
        console.log('TZ STAT UPLOAD', res)
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
            nativity: {},
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
            }
        }

        const NestedCard = ({name, data, key_i}) => {
            let total = 0
            Object.entries(data).forEach(([k,v]) => {
                if (k.toLowerCase().search('total') <= -1 && k.toLowerCase().search('median') <= -1)
                    total += v
            })
            return (
                <Card style={{backgroundColor: lightBg}}>
                    <Accordion.Toggle as={Card.Header} eventKey={key_i} style={{color: 'whitesmoke', backgroundColor: darkBg, margin: '3px', fontWeight: 'bold'}}>
                        {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={key_i} >
                    <Card.Body>
                        <div style={{overflowX: "auto", width: "100%"}}>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            {
                                
                                Object.entries(data).map((data, i) => {
                                let entry = data[0].replace(/_/g, ' ')

                                let output = getPercent(data[1], total)
                                if (entry.toLowerCase().search('total') > -1 || entry.toLowerCase().search('median') > -1) output = formatCommas(data[1])
                                return (
                                    <tr key={i}>
                                        <td>{capitalize(entry)}</td><td>{output}</td>
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
        let business_type= this.props.business_type.type.replace(/_/g, ' ')
        if (business_type == 'lodging') business_type = 'hotel /lodging'

        return (
           <div className={this.props.orientation} style={{backgroundColor: lightBg, display: 'flex', flexDirection: 'column'}}>

            <div>
                <div className="demographics_header" style={{ textAlign: 'center', backgroundColor: lightBg }}>
                <br></br>
                    <strong style={{color:'whitesmoke'}}>Demographics</strong>
                    <br></br>
                    <br></br>
                  </div>
                <div style={{display: 'flex', }}>
                  <Button variant={this.state.zipVariant} className='map-control_button'  onClick={this.onUpdateDataRange} value= {'zip'} style={{margin: 'auto', width: '50%', height: 35, padding: '0', fontWeight: 'bold'}}>
                    Zip
                </Button>
                <LoadingButton click={this.onUpdateDataRange} buffer={this.checkForTradeZone} buttonVariant={this.state.tzVariant}/>
                </div>
            </div>
            <div style={{ flexGrow: 1, overflowY: 'auto', backgroundColor: lightBg}}>
               <Accordion defaultActiveKey="0" >
                <Card style={{backgroundColor: lightBg}}>
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{color: 'whitesmoke', backgroundColor: darkBg, marginTop: '3px', fontWeight: 'bold'}}>
                    General
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody style={{overflowX: 'auto'}}>
                            <tr>
                            <td>Business</td><td>{capitalize(business_type)}</td>
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
                
                <Card style={{backgroundColor: lightBg}}>
                    <Accordion.Toggle as={Card.Header} eventKey="1" style={{color: 'whitesmoke', backgroundColor: darkBg, marginTop: '3px', fontWeight: 'bold'}}>
                    Social
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                        <NestedCard name={"Ethnicity"} data={social_data.race} key_i={"0"}></NestedCard>
                        <NestedCard name={"Nativity"} data={social_data.nativity} key_i={"1"}></NestedCard>
                        <NestedCard name={"Education (Ages 25+)"} data={social_data.education} key_i={"2"}></NestedCard>
                        <NestedCard name={"Marital Status (Ages 15+)"} data={social_data.marital_status} key_i={"3"}></NestedCard>
                        <NestedCard name={"Transportation (for work)"} data={social_data.transportation} key_i={"4"}></NestedCard>
                        </Accordion>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{backgroundColor: lightBg}}>
                    <Accordion.Toggle as={Card.Header} eventKey="2" style={{color: 'whitesmoke', background: darkBg, fontWeight: 'bold'}}>
                    Household Income
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            <tr>
                            <td>Sample total</td><td>{formatCommas(income_data.sample_total)}</td>
                             </tr><tr>
                             <td>Median Household Income</td><td>{'$'+ formatCommas(income_data.median)}</td>
                             </tr><tr>
                             <td>0-35k</td><td>{getPercent(income_data._0_9999 + income_data._10000_14999 + income_data._15000_19999 + income_data._20000_24999 + income_data._25000_29999 + income_data._30000_34999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>35-50k</td><td>{getPercent(income_data._35000_39999 + income_data._40000_44999 + income_data._45000_49999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>50-75k</td><td>{getPercent(income_data._50000_59999 + income_data._60000_74999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>75-100k</td><td>{getPercent(income_data._75000_99999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>100-150k</td><td>{getPercent(income_data._100000_124999 + income_data._125000_149999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>150-200k</td><td>{getPercent(income_data._150000_199999, income_data.sample_total)}</td>
                             </tr><tr>
                             <td>200k+</td><td>{getPercent(income_data._200000_MORE, income_data.sample_total)}</td>
                             </tr>
                        </tbody>
                        </Table>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card style={{backgroundColor: lightBg}}>
                    <Accordion.Toggle as={Card.Header} eventKey="3" style={{color: 'whitesmoke', background: darkBg, fontWeight: 'bold'}}>
                    Age
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3" >
                    <Card.Body>
                        <Table striped bordered hover variant="dark" >
                        <tbody>
                            <tr>
                            <td>Median</td><td>{age_data.median_age + ' yrs'}</td>
                             </tr><tr>
                             <td>Sample Total</td><td>{formatCommas(age_data.sample_total)}</td>
                             </tr><tr>
                             <td>0-9yrs</td><td>{getPercent(age_data.ZERO_FIVE + age_data.FIVE_NINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>10-19yrs</td><td>{getPercent(age_data.TEN_FOURTEEN + age_data.FIFTEEN_SEVENTEEN + age_data.EIGHTEEN_NINETEEN, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>20-29yrs</td><td>{getPercent(age_data.TWENTY + age_data.TWENTYONE + age_data.TWENTYTWO_TWENTYFOUR + age_data.TWENTYFIVE_TWENTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>30-39yrs</td><td>{getPercent(age_data.THIRTY_THIRTYFOUR + age_data.THIRTYFIVE_THIRTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>40-49yrs</td><td>{getPercent(age_data.FORTY_FORTYFOUR + age_data.FORTYFIVE_FORTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>50-59yrs</td><td>{getPercent(age_data.FIFTY_FIFTYFOUR + age_data.FIFTYFIVE_FIFTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>60-69yrs</td><td>{getPercent(age_data.SIXTY_SIXTYONE + age_data.SIXTYTWO_SIXTYFOUR + age_data.SIXTYFIVE_SIXTYSIX + age_data.SIXTYSEVEN_SIXTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>70-79yrs</td><td>{getPercent(age_data.SEVENTY_SEVENTYFOUR + age_data.SEVENTYFIVE_SEVENTYNINE, age_data.sample_total)}</td>
                             </tr><tr>
                             <td>80+yrs</td><td>{getPercent(age_data.EIGHTY_EIGHTYFOUR + age_data.EIGHTYFIVE_UP, age_data.sample_total)}</td>
                             </tr>
                        </tbody>
                        </Table>
                    </Card.Body>
                    </Accordion.Collapse>
                </Card>
                </Accordion>
                </div>
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
        style={{margin: 'auto', width: '50%', height: 35, padding: '0', fontWeight: 'bold'}}
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

  const getPercent = (value, total) => {
      return ((value/total) * 100).toFixed(1) + '%'
  }

  const capitalize = word => {
      let split = word.split(' ')
      let capitalize = []
      split.forEach(e => {
          if (e == 'or' || e == 'or')
            capitalize.push(e)
          else 
            capitalize.push(e.substring(0, 1).toUpperCase() + e.substring(1, e.length))
      })
      return capitalize.join(' ')
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