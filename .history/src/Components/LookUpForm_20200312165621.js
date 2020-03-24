import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import { updateBusinessType} from '../Actions/business-actions'
import { updateReady } from '../Actions/ready-actions'
import { updateIsCity } from '../Actions/isCity-actions'
import { updateDataRange } from '../Actions/dataRange-actions'
import { updateGeoUnit } from '../Actions/geoUnit-actions'
import { clearData } from '../Actions/root-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { BUSINESS_TYPES } from '../Constants'
import AutoCompleteBar from './AutoCompleteBar'
import * as selectors from '../Reducers/selectors'
import { updateAddress} from '../Actions/address-actions'
import { Link, withRouter } from 'react-router-dom'
import {AiOutlineInfoCircle} from 'react-icons/ai'
import ReactTooltip from 'react-tooltip'
import Modal from 'react-bootstrap/Modal'
import  {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { getLocation, createLocation } from '../Requests/locations-requests';
import { compose } from '../../../../../../Library/Caches/typescript/3.4.5/node_modules/redux';
const ZIP = 'zip code tabulation area'
const TRADE_ZONE = 'tradeZone'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class LookUpForm extends React.Component {

    constructor(props) {
        super(props)

        this.onFormChange = this.onFormChange.bind(this);
        this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
        this.onUpdateBusinessType = this.onUpdateBusinessType.bind(this);
        this.onUpdateReady = this.onUpdateReady.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onUpdateIsCity = this.onUpdateIsCity.bind(this)
        this.onTempFormChange = this.onTempFormChange.bind(this)
        this.onPriceFormChange = this.onPriceFormChange.bind(this)
        this.onUpdateAddress = this.onUpdateAddress.bind(this)
        this.getAddress = this.getAddress.bind(this)

        this.state = {
            priceLevel : 1,
            business_type : 'restaurant',
            distance: 'Driving',
            geoUnit: 'zip',
            showModal: false,
            recentSearchs : new Map(),
        };
    }

    async componentDidMount() {
        if (this.props.urlParams) {
            let type = this.props.urlParams.business_type
            if (type == 'lodging') type = 'hotels /lodging'

            let business = {
                type: this.props.urlParams.business_type,
                priceLevel : this.state.priceLevel
            }
            let promises= [
                this.loadAddress(JSON.parse(this.props.urlParams.address)),
                this.onUpdateBusinessType(business),
                this.setState({business_type: this.props.urlParams.business_type.replace(/_/g, ' ')}),
            ]

            if (this.props.urlParams.distance.toLowerCase() == 'driving') {
                promises.push(this.onUpdateIsCity(false))
                promises.push(this.setState({distance: 'Driving'}))
            }
            else  {
                promises.push(this.onUpdateIsCity(true))
                promises.push(this.setState({distance: 'Walking'}))
            }
            let res = await Promise.all(promises)
            console.log('PROMISE ALL', res)
            await this.onUpdateAddress()
            this.onUpdateReady(true)
        }
    }

    loadAddress = async (address) => {

        return new Promise(async (resolve, reject) => {

            
            let zip, number, street, city, state = ''
            let place;
            let geoCode = await geocodeByAddress(address)
            .then(results => { 
                for (let c of results[0].address_components) {
                    for (let type of c.types) {
                        if (type == 'street_number')
                            number = c.long_name 
                        if (type == 'route')
                            street =  c.short_name 
                        if (type == 'locality')
                            city = c.long_name
                        if (type == 'administrative_area_level_1')
                            state = c.short_name
                        if (type == "postal_code") 
                            zip = c.long_name
                    }
                }
                if (number == undefined) number = ''
                if (street == undefined) street = ''
                place = results[0]
                return getLatLng(results[0])
                })
            .then(latLng => latLng)
            .catch(error => console.error('Error', error));
            let addressState = {}
            addressState.formatted = address
            addressState.street = number + ' ' + street
           
            addressState.city = city
            addressState.state = state
            addressState.zip = zip
            addressState.coords = geoCode
            addressState.place = place
            
            // handle no street
            if (addressState.street == " ") {
                let firstPart = address.substring(0, address.indexOf(','))
                let alreadyInAddress = false

                Object.entries(addressState).forEach(([label, value]) => {
                    console.log('STREET_XXX', label, value, firstPart)
                    if (value == firstPart) {
                        alreadyInAddress = true
                    }
                })
                if (!alreadyInAddress)
                    addressState.street = firstPart
            }

            // handle no city
            if (addressState.city == undefined) {
                let secondPart = address.substring(address.indexOf(',')+1, address.length)
                secondPart = secondPart.substring(0, secondPart.indexOf(','))
                let alreadyInAddress2 = false

                Object.entries(addressState).forEach(([label, value]) => {
                    console.log('CITY_XXX', label, value, secondPart)
                    if (value == secondPart) {
                        alreadyInAddress2 = true
                    }
                })
                if (!alreadyInAddress2)
                    addressState.city = secondPart
            }

        
            console.log(addressState)
            await this.setState({address: addressState})
            resolve(addressState)
        })

    }
    
    onUpdateBusinessType(business_type) {
        this.props.onUpdateBusinessType(business_type)
    }

    onUpdateIsCity(isCity) {
        console.log('UPDATE IS CITY', isCity, this.state.distance)
        this.props.onUpdateIsCity(isCity)
    }
    onFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onPriceFormChange(event) {
       let value = event.target.value.substring(0, 1)
       this.setState({[event.target.name]: value})
    }

    onBusinessFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onTempFormChange(event) {
        this.setState({distance: event.target.value})
        if (event.target.value == 'Walking') {
            this.onUpdateIsCity(true)
        }
        else
            this.onUpdateIsCity(false)
    }

    onUpdateReady(isReady) {
        this.props.onUpdateReady(isReady)
    }

    async onHandleSubmit() {
        // return if no address
        if (this.state.address == undefined) 
            return;
        
        await this.onUpdateAddress(this.state.address)
        console.log('999', this.props.address)
        let type = this.state.business_type
        if (type == 'hotels /lodging') type = 'lodging'
        let business = {
            type: type.replace(/ /g, '_'),
            priceLevel : this.state.priceLevel
        }
        this.onUpdateBusinessType(business)
        this.onUpdateGeoUnit(this.state.geoUnit)
       
        if (this.props.address.toString().length > 0) {
            if (this.props.ready) {
                await this.onUpdateReady(false)
                await this.onUpdateReady(true)
            } else {
                await this.onUpdateReady(true)
            }

            // reset data_range to zip
            if (this.props.data_range != ZIP) {
                await this.props.onUpdateDataRange(ZIP)
            }
            // recent searches
            this.checkLocalStorage(this.props.address)

            let address = encodeURI(JSON.stringify(this.props.address.formatted))
            let business_type = encodeURI(this.props.business_type.type)
            let url = '/' + address + '/' + business_type + '/' + this.state.distance
            this.props.history.push(url)
        }
        else {
            this.onUpdateReady(false)
        }
    }

    onUpdateAddress = async () => {
        let address = this.state.address
        // check for location from db 
        console.log('onUpdateAddress', address)
        let results = await getLocation(address.place.place_id)
        console.log('CHECK FOR LOCATION', address.place.place_id, results)
        if (results.res.length <= 0) {
            console.log('CREATE NEW PLACE')
            let createRes = await createLocation(address.place.place_id, address)
            console.log('create res', createRes)
            address.isNewEntry = true
        } else {
            address.isNewEntry = false
        }
        this.props.onUpdateAddress(address)
    }

    checkLocalStorage = location => {
        // if signed in push to recent searches
        if (this.props.user_id != -1) {
               let searches = JSON.parse(localStorage.getItem('recentSearches'))
      
               if (searches == null) searches = new Map()
               else {
                    // keep last 25 
                    if (searches.length > 25)
                    searches = searches.slice((searches.length) -25, searches.length)
                    searches = new Map(searches)
               }
   
               searches.set(location.place.place_id, { 
                   location: location,
                    business_type: this.props.business_type, 
                    distance: this.state.distance, 
                    date : new Date()
                })

               localStorage.setItem('recentSearches', JSON.stringify(Array.from(searches.entries())))
           }
    }

    getAddress = async (address) => {
        let addressState = this.loadAddress(address)
        await this.setState({address: addressState})
    }

    setModalShow = (flag) => {
        this.setState({showModal: flag})
    }

    onUpdateDataRange = (range) => {
        this.props.onUpdateDataRange(range)
    }

    onUpdateGeoUnit = (geo_unit) => {
        this.props.onUpdateGeoUnit(geo_unit)
    }

    render() {
 
        return (
            <div className="lookup-form-block">
                <br></br>
                <div>
                    <Form.Label color="black" style={{color: textPrimary}}>Address</Form.Label>
                    <InfoButton  clickFunction={()=>this.setModalShow(true)}/>    
                    <MyVerticallyCenteredModal
                        show={this.state.showModal}
                        onHide={() => this.setState({showModal:false})}
                    />
                    
                </div>
                <AutoCompleteBar urlParams={this.props.urlParams} addressFunction={this.getAddress}/>
                <br></br>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label style={{color: textPrimary}} style={{color: textPrimary}}>Your Proposed Business Type</Form.Label>
                    <Form.Control as="select" name="business_type" value={this.state.business_type} onChange={this.onBusinessFormChange}>
                            {BUSINESS_TYPES.map((e,i) => {
                                return <option key={i}>{e.replace(/_/g, ' ')}</option>
                             })}
                     </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label style={{color: textPrimary}}>Tradezone: Walking/Driving Customer Base</Form.Label>
                        <Form.Control  as="select" name="isCity" onChange={this.onTempFormChange} value={this.state.distance}>
                        <option>Driving</option>
                        <option>Walking</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label style={{color: textPrimary}}>Zip, Tract, Blocks</Form.Label>
                        <Form.Control  as="select" name="geoUnit" onChange={this.onBusinessFormChange} value={this.state.geoUnit}>
                        <option>zip</option>
                        <option>tract</option>
                        <option>blocks</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
            <Form><Button variant="primary" onClick={this.onHandleSubmit} style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>
                    Submit
                </Button>
            </Form>
            <div style={{ marginTop: '2em', backgroundColor: 'rgba(1,1,1,0.6'}}>
                      <p style={{ fontSize: 18, color: 'whitesmoke', padding: 5, margin: 'auto'}}>*Current locations support New Jersey, the 5 boroughs of New York City, and Long Island</p>
            </div>
        </div>
        );
    }
}

const InfoButton = (props) => {
    const [clicked, setClicked] = useState(false)
    let color = 'white'

    if (clicked) {
     //   color = 'rgba(255,255,255,0.5'
    }
    else color = 'white'
    
    let style = {color: color, float: 'right'}

    return (
         <AiOutlineInfoCircle onClick={(e)=> [setClicked(!clicked), props.clickFunction()]} 
         style={style}/>
    ) 
}

const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Location Search 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 style={{fontSize: '20px'}}>
            1. Start typing a street address* or the name of a business and select from the autofill results.
          </h3>
          <p>
                <span><strong>*Current locations support New Jersey, the 5 boroughs of New York City, and Long Island</strong> </span>   
              <br></br>
              <span> For intersections type the first street then '&amp;' or 'and' then the next street.</span>   
              <br></br>
            <span>
            For example, '3rd Ave &amp; 11th St, New York, NY'
            </span>
          </p>
          <h3 style={{fontSize: '20px'}}>
            2. Select your new business type. This will be used to determine local competitors
          </h3>
          <p>
              <span> For 'Residential' business types, nearby establishments will be displayed instead of competitors</span>   
          </p>
          <h3 style={{fontSize: '20px'}}>
            3. Select your customer base, walking or driving. This will help determine your site's Retail Trade Zone
          </h3>
          <p>
              <span>Typically, 'Driving' works best for suburban areas and 'Walking' for urban areas</span>   
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
const mapStateToProps = createSelector(
    selectors.userSelector,
    selectors.businessTypeSelector,
    selectors.readySelector,
    selectors.addressSelector,
    selectors.isCitySelector,
    selectors.tradeZoneBoundsSelector,
    selectors.dataRangeSelector,
    selectors.geoUnitSelector,
    (user, business_type, ready, address, isCity, tradeZone_bounds, data_range, geo_unit) => ({
        user,
        business_type,
        ready,
        address,
        isCity,
        tradeZone_bounds,
        data_range,
        geo_unit
    })
);

const mapActionsToProps = {
     onUpdateBusinessType: updateBusinessType,
     onUpdateReady: updateReady,
     onUpdateIsCity: updateIsCity,
     onUpdateAddress: updateAddress,
     onUpdateDataRange: updateDataRange,
     onUpdateGeoUnit : updateGeoUnit
};

export default withRouter(connect(mapStateToProps, mapActionsToProps) (LookUpForm));
