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
        }
    }


    handleSubmit = async () => {
        let res = await createListing(this.props.formData)
        console.log("create_listing", res)
    }

    selectAddress = async (address) => {
        let zip, number, street, city, state = ''
        let place;
        let geoCode = await geocodeByAddress(address).then(results => { 
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
        
        console.log("select", zip, number, street, city, state)
    }


    render() {
        return (
            <div style={{ display: 'flex',  height: '80vh', alignItems: 'center',  flexDirection: 'column', padding: '20px' }}>
                <br></br>
                <h3>Select Location</h3>
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