import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import '../css/App.css';
import { getPopulation  } from '../Requests/city-requests' 
import { updateBusinessType} from '../Actions/business-actions'
import { updateReady } from '../Actions/ready-actions'
import { updateIsCity } from '../Actions/isCity-actions'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import AutoCompleteBar from './AutoCompleteBar'
import * as selectors from '../Reducers/selectors'

class LookUpForm extends React.Component {

    constructor(props) {
        super(props)

        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
        this.onUpdateBusinessType = this.onUpdateBusinessType.bind(this);
        this.dispatchAddress = this.dispatchAddress.bind(this);
        this.onUpdateReady = this.onUpdateReady.bind(this)
        this.onHandleSubmit = this.onHandleSubmit.bind(this)
        this.onUpdateisCity = this.onUpdateisCity.bind(this)

        this.state = {};
    }

    componentDidMount() {
    }

    onUpdateUser(event) {
        this.props.onUpdateUser(event.target.value);
    }

    onUpdateBusinessType(business_type) {
        this.props.onUpdateBusinessType(business_type)
    }

    onUpdatePopulationType(population_type) {
        this.props.onUpdatePopulationType(population_type)
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
            this.onUpdateisCity(true)
        else
            this.onUpdateisCity(false)
    }

    onUpdateReady(isReady) {
        this.props.onUpdateReady(isReady)
    }

    async onHandleSubmit() {
        if (this.props.address.toString().length > 0) {
            console.log(this.props.address.coords)
          //  await getPopulation(this.props.address.coords.lat, this.props.address.coords.lng).then(res => console.log('Lookup, isCity', res))
            this.onUpdateReady(true)
        }
        else {
            this.onUpdateReady(false)
        }
    }

    dispatchAddress() {
        if (this.state.street !== undefined
            && this.state.city !== undefined
            && this.state.state !== undefined
            && this.state.zip !== undefined
            && this.state.coords !== undefined) {

                var address = {}
                address.street = this.state.street;
                address.city = this.state.city;
                address.state = this.state.state;
                address.zip = this.state.zip;
                address.coords = this.state.coords;

                // update to store
                this.onUpdateAddress(address)
                this.onUpdateZip(this.state.zip)
                this.onUpdateState(this.state.state)
            }
    }

    render() {
        console.log('isCity', this.props.isCity)
       // console.log("Form state", this.state)
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
    (business_type, ready, address, isCity) => ({
        business_type,
        ready,
        address,
        isCity
    })
);

const mapActionsToProps = {
     onUpdateBusinessType: updateBusinessType,
     onUpdateReady: updateReady,
     onUpdateisCity: updateIsCity
};

export default connect(mapStateToProps, mapActionsToProps) (LookUpForm);
