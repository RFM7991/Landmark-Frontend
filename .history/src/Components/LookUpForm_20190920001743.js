import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import { getPopulation  } from '../Requests/city-requests' 
import { getTradeZoneBounds } from '../Requests/tradezone-requests'
import { updateBusinessType} from '../Actions/business-actions'
import { updateReady } from '../Actions/ready-actions'
import { updateIsCity } from '../Actions/isCity-actions'
import { updateTradeZoneBounds } from '../Actions/tradeZoneBoundaries-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import AutoCompleteBar from './AutoCompleteBar'
import * as selectors from '../Reducers/selectors'

class LookUpForm extends React.Component {

    constructor(props) {
        super(props)

        this.onFormChange = this.onFormChange.bind(this);
        this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
        this.onUpdateBusinessType = this.onUpdateBusinessType.bind(this);
        this.onUpdateTradeZoneBounds = this.onUpdateTradeZoneBounds.bind(this)
        this.onUpdateReady = this.onUpdateReady.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onUpdateIsCity = this.onUpdateIsCity.bind(this)
        this.onTempFormChange = this.onTempFormChange.bind(this)

        this.state = {};
    }

    componentDidMount() {
    }

    onUpdateBusinessType(business_type) {
        this.props.onUpdateBusinessType(business_type)
    }

    onUpdateTradeZoneBounds(tradeZone_bounds) {
        this.props.onUpdateTradeZoneBounds(tradeZone_bounds)
    }
    onUpdateIsCity(isCity) {
        this.props.onUpdateIsCity(isCity)
    }
    onFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onBusinessFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
        this.onUpdateBusinessType(event.target.value)
    }

    onTempFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
        if (event.target.value == 'yes')
            this.onUpdateIsCity(true)
        else
            this.onUpdateIsCity(false)
    }

    onUpdateReady(isReady) {
        this.props.onUpdateReady(isReady)
    }

    onHandleSubmit() {
        getTradeZoneBounds(this.props.isCity, this.props.address.coords)
        .then(res => this.onUpdateTradeZoneBounds(res))
        console.log(this.props)
        if (this.props.address.toString().length > 0) {
          //  await getPopulation(this.props.address.coords.lat, this.props.address.coords.lng).then(res => console.log('Lookup, isCity', res))
            this.onUpdateReady(true)
        }
        else {
            this.onUpdateReady(false)
        }
    }

    render() {
        return (
            <div className="lookup-form-block">
                <br></br>
                <Form.Label color="black">Address</Form.Label>
                <AutoCompleteBar></AutoCompleteBar>
                <br></br>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Business Type</Form.Label>
                        <Form.Control as="select" name="business_type" onChange={this.onBusinessFormChange}>
                        <option>restaurant</option>
                        <option>bar</option>
                        <option>cafe</option>
                        <option>beauty_salon</option>
                        <option>clothing_store</option>
                        <option>convenience_store</option>
                        <option>locksmith</option>
                        <option>bakery</option>
                        <option>car_dealer</option>
                        <option>supermarket</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Is City? (Temporary)</Form.Label>
                        <Form.Control as="select" name="isCity" onChange={this.onTempFormChange}>
                        <option>yes</option>
                        <option>no</option>
                   
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
            <Form>
              
                <Button variant="primary" onClick={this.onHandleSubmit} >
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
     onUpdateTradeZoneBounds: updateTradeZoneBounds
};

export default connect(mapStateToProps, mapActionsToProps) (LookUpForm);
