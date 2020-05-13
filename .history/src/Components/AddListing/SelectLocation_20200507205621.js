import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Col from 'react-bootstrap/Col'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import { createListing } from "../../Requests/listings-requests"
import Button from 'react-bootstrap/Button'
import AutoCompleteBar from "../AutoCompleteBar"
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class SelectLocation extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            error : false,
            errorMessage : ''
        }
    }


    handleSubmit = async () => {
        let res = await createListing(this.props.formData)
        console.log("create_listing", res)
    }

    selectAddress = async (address) => {
        this.setState({ error : false })
        let error = false
        let zip, number, street, city, state = ''
        let place;
        let geoCode = await geocodeByAddress(address).then(results => { 
                for (let c of results[0].address_components) {
                    for (let type of c.types) {
                        if (type == 'street_number')
                            number = c.long_name 
                        else if (type == 'route')
                            street =  c.short_name 
                        else if (type == 'locality')
                            city = c.long_name
                        else if (type == 'administrative_area_level_1')
                            state = c.short_name
                        else if (type == "postal_code") 
                            zip = c.long_name
                    }
                }
                // improper address
                if (number == undefined) {
                    this.setState({ error : true, errorMessage : "Sorry, this address is too general. Please try again" })
                    error = true 
                    return;
                }  
                
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

           

            if (error) return;
            console.log("select", addressState)
            this.setState({ address : addressState })
        
        
    }


    render() {
        return (
            <div style={{ display: 'flex',  height: '80vh', alignItems: 'center',  flexDirection: 'column', padding: '20px' }}>
                <br></br>
                <h3>Select Location</h3>
                {!this.state.error && <p style={{ color: 'white', marginTop: 10}}>spacer</p>}
                {this.state.error && <p style={{ color: 'red', marginTop: 10}}>{this.state.errorMessage}</p>}
                <div style={{ width: '50%', marginTop: '2.5%', marginBottom: '10%' }}>
                
                        <AutoCompleteBar addressFunction={this.selectAddress}/>
              
                </div>
                
                <br></br>
                <Button variant="primary" onClick={this.handleSubmit} disabled={this.state.location == undefined}
                    style={{backgroundColor:'#00d4ff', fontWeight: 'bold', alignSelf: 'center', marginRight: '1em', marginBottom : '1em' }}>
                    Submit
                </Button>
            </div>
        )
    }
 }

 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
     selectors.userSelector,
    (address, user) => ({
        address, user 
    })
 )


 export default connect(mapStateToProps)(SelectLocation)