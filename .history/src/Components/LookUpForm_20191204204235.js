import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import { getPopulation  } from '../Requests/city-requests' 
import { updateBusinessType} from '../Actions/business-actions'
import { updateReady } from '../Actions/ready-actions'
import { updateIsCity } from '../Actions/isCity-actions'
import { clearData } from '../Actions/root-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import { BUSINESS_TYPES } from '../Constants'
import AutoCompleteBar from './AutoCompleteBar'
import * as selectors from '../Reducers/selectors'
import { updateAddress} from '../Actions/address-actions'
import { Link, withRouter } from 'react-router-dom'
import  {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

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

        this.state = {
            priceLevel : 1,
            business_type : 'restaurant',
            distance: 'Driving'
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
            let address = await this.loadAddress(JSON.parse(this.props.urlParams.address))
            let promises= [
                this.onUpdateAddress(address),
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
            await Promise.all(promises)
            this.onUpdateReady(true)
        }
    }

    loadAddress = async (address) => {
        let zip, number, street, city, state;
        let place;
        let geoCode = await geocodeByAddress(address)
          .then(results => { 
              for (let c of results[0].address_components) {
                  for (let type of c.types) {
                    if (type == 'street_number')
                        number = c.long_name
                    if (type == 'route')
                        street = c.short_name
                    if (type == 'locality')
                        city = c.long_name
                    if (type == 'administrative_area_level_1')
                        state = c.short_name
                    if (type == "postal_code") 
                        zip = c.long_name
                  }
              }
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
    
          return addressState
    }
    

    onUpdateBusinessType(business_type) {
        this.props.onUpdateBusinessType(business_type)
    }

    onUpdateIsCity(isCity) {
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
        if (event.target.value == 'Walking')
            this.onUpdateIsCity(true)
        else
            this.onUpdateIsCity(false)
    }

    onUpdateReady(isReady) {
        this.props.onUpdateReady(isReady)
    }

    async onHandleSubmit() {
        console.log('HANDLE SUBMIT')
        let type = this.state.business_type
        if (type == 'hotels /lodging') type = 'lodging'
        let business = {
            type: type.replace(/ /g, '_'),
            priceLevel : this.state.priceLevel
        }
        console.log('type', business)
        this.onUpdateBusinessType(business)
        if (this.props.address.toString().length > 0) {
            if (this.props.ready) {
                await this.onUpdateReady(false)
                await this.onUpdateReady(true)
            } else {
                await this.onUpdateReady(true)
            }
            let address = encodeURI(JSON.stringify(this.props.address.formatted))
            let business_type = encodeURI(this.props.business_type.type)
            let url = '/' + address + '/' + business_type + '/' + this.state.distance
            console.log('URL', url)
            this.props.history.push(url)
        }
        else {
            this.onUpdateReady(false)
        }
    }

    onUpdateAddress = (address) => {
        console.log('update', address)
        this.props.onUpdateAddress(address)
    }

    render() {
        console.log("LUF", this.props)
 
        return (
            <div className="lookup-form-block">
                <br></br>
                <Form.Label color="black">Address</Form.Label>
                <AutoCompleteBar urlParams={this.props.urlParams}/>
                <br></br>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Business Type</Form.Label>
                    <Form.Control as="select" name="business_type" value={this.state.business_type} onChange={this.onBusinessFormChange}>
                            {BUSINESS_TYPES.map((e,i) => {
                                return <option key={i}>{e.replace(/_/g, ' ')}</option>
                             })}
                     </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Tradezone: Walking/Driving Customer Base</Form.Label>
                        <Form.Control  as="select" name="isCity" onChange={this.onTempFormChange} value={this.state.distance}>
                        <option>Driving</option>
                        <option>Walking</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
            <Form><Button variant="primary" onClick={this.onHandleSubmit} >
                    Submit
                </Button>
            </Form>
        </div>
        );
    }
}

const mapStateToProps = createSelector(
    selectors.businessTypeSelector,
    selectors.readySelector,
    selectors.addressSelector,
    selectors.isCitySelector,
    selectors.tradeZoneBoundsSelector,
    (business_type, ready, address, isCity, tradeZone_bounds) => ({
        business_type,
        ready,
        address,
        isCity,
        tradeZone_bounds
    })
);

const mapActionsToProps = {
     onUpdateBusinessType: updateBusinessType,
     onUpdateReady: updateReady,
     onUpdateIsCity: updateIsCity,
     onUpdateAddress: updateAddress
};

export default withRouter(connect(mapStateToProps, mapActionsToProps) (LookUpForm));
