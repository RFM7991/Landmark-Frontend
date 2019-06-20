import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './App.css';
import { updateUser, getGeoCode} from './Actions/user-actions'
import { updateAddress} from './Actions/address-actions'
import { updateBusinessType} from './Actions/business-actions'

import { connect } from 'react-redux'
import { createSelector } from 'reselect';


class LookUpForm extends React.Component {

    constructor(props) {
        super(props)

        this.onUpdateUser = this.onUpdateUser.bind(this);
        this.onFormChange = this.onFormChange.bind(this);
        this.onBusinessFormChange = this.onBusinessFormChange.bind(this);
        this.submitAddress = this.submitAddress.bind(this);
        this.onUpdateAddress = this.onUpdateAddress.bind(this);
        this.onUpdateBusinessType = this.onUpdateBusinessType.bind(this);
        this.getCoords = this.getCoords.bind(this);
        this.dispatchAddress = this.dispatchAddress.bind(this);

        this.state = {};
    }

    componentDidMount() {
     //   setTimeout(() => {
      //  this.props.onAPIRequest();
       // }, 1500);
    }

    onUpdateUser(event) {
        this.props.onUpdateUser(event.target.value);
    }

    onUpdateAddress(address) {
        this.props.onUpdateAddress(address)
    }

    onUpdateBusinessType(business_type) {
        this.props.onUpdateBusinessType(business_type)
    }

    onFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    onBusinessFormChange(event) {
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state)
    }

     submitAddress(event) {
        if (this.state.street !== undefined
            && this.state.city !== undefined
            && this.state.state !== undefined
            && this.state.zip !== undefined) {
                console.log("Attempt submit")
 
                // get geocode
                getGeoCode(this.state.street, this.state.city, this.state.state, this.getCoords)
            }
    }

    // gets coords and adds to state 
    getCoords(data) {
        var res = data.results
        
        if (res.length > 1) {
            console.log("ERROR, Multiple Locations")
        }
        //To-do handle mulitple location error or null response
        let coords = res[0].geometry.location
        this.setState({'coords': coords})

        // send full address to store
        this.dispatchAddress()
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
            }
    }

    render() {
       // console.log("Form state", this.state)
        return (
            <div className="lookup-form-block">
            <Form>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label color="black">Address</Form.Label>
                    <Form.Control name="street" placeholder="1234 Main St" onChange={this.onFormChange}/>
                   
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" onChange={this.onFormChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" name="state" onChange={this.onFormChange}>
                        <option>Choose...</option>
                        <option>NJ</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control name="zip" onChange={this.onFormChange}/>
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Business Type</Form.Label>
                        <Form.Control as="select" name="business_type" onChange={this.onBusinessFormChange}>
                        <option>Choose...</option>
                        <option>restaurant</option>
                        <option>bar</option>
                        <option>cafe</option>
                        <option>beauty_salon</option>
                        <option>clothing_store</option>
                        <option>convenvience_store</option>
                    </Form.Control>
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" onClick={this.submitAddress} >
                    Submit
                </Button>
            </Form>
        </div>
        );
    }
}

const productsSelector = createSelector (
    state => state.products,
    products => products
);

const userSelector = createSelector (
    state => state.user,
    user => user
);

const addressSelector = createSelector (
    state => state.address,
    address => address
);

const businessTypeSelector = createSelector (
    state => state.business_type,
    business_type => business_type
);

const mapStateToProps = createSelector(
    productsSelector,
    userSelector,
    addressSelector,
    businessTypeSelector,
    (products, user, address, business_type) => ({
        products,
        user,
        address,
        business_type
    })
);

const mapActionsToProps = {
    
     onUpdateUser: updateUser,
     onUpdateAddress: updateAddress,
     onUpdateBusinessType: updateBusinessType
};


export default connect(mapStateToProps, mapActionsToProps) (LookUpForm);
