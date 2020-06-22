import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Col from 'react-bootstrap/Col'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import { createListing,  setListingPhotos} from "../../Requests/listings-requests"
import Button from 'react-bootstrap/Button'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
        }
    }

    handleUploadPhotos = async (listingId) => {
        
        let formData = new FormData();
        formData.append("listingId", ''+listingId)
        this.props.photos.contact_photos.forEach(e => formData.append("contact_photos", e))
        this.props.photos.site_photos.forEach(e => formData.append("site_photos", e))

        let res = await setListingPhotos(formData)
    }
   

    handleSubmit = async () => {
        let res = await createListing(this.props.formData)

        // upload photos
        if (res.listingId != undefined) {
            let x = await this.handleUploadPhotos(res.listingId)
            console.log("UPLOAD_PHOTO", x)
        }
       
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                <div style={{ borderBottom: '1px solid black', width: '25%', textAlign: 'left'}}>       
                    <h3>Review and Submit</h3>
                </div> 
                <br></br>
                
                <div style={{ borderBottom: '1px solid black', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>1. Contact Info</h3>
                </div> 
               
                    {this.props.formData.contactInfo != undefined &&
                        <Table striped bordered hover variant="dark" >
                            <th></th>
                            {Object.entries(this.props.formData.contactInfo).map(([key, val], i) => {
                                return (
                                    <tr><td>{formatKeys(key)}</td><td className="tableValue">{capitalizeFirst(val)}</td></tr>
                                )
                            })}
                        </Table>
                    }

                <div style={{ borderBottom: '1px solid black', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>2. location Details</h3>
                </div> 
                    {this.props.formData.locationDetails != undefined &&
                    <Table>
                        <th></th>
                        {Object.entries(this.props.formData.locationDetails).map(([key, val], i) => {
                            return (
                                <tr><td>{formatKeys(key)}</td><td>{val}</td></tr>
                            )
                        })}
                    </Table>
                    }

                <div style={{ borderBottom: '1px solid black', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>3. Pricing and Terms</h3>
                </div> 
                    {this.props.formData.pricingInfo != undefined &&
                    <Table>
                        <th></th>
                        {Object.entries(this.props.formData.pricingInfo).map(([key, val], i) => {
                            return (
                                <tr><td>{formatKeys(key)}</td><td>{val}</td></tr>
                            )
                        })}
                    </Table>
                }   

                <Button variant="primary" onClick={this.handleSubmit} 
                    style={{backgroundColor:'#00d4ff', fontWeight: 'bold', alignSelf: 'center', marginRight: '1em', marginBottom : '1em', marginTop: '3em'  }}>
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

 const formatKeys = value => {
    let formatted = ""
    for (let i=0; i < value.length; i++) {
        let char = value.substring(i, i+1)
        if (i == 0) {
            formatted += char.toUpperCase()
            continue;
        }
        
        if (char == char.toUpperCase()) {
            formatted += " " + char
            continue;
        }

        formatted += char;
    }
    return formatted;
 }

 const capitalizeFirst = value => {
    return value.substring(0,1).toUpperCase() + value.substring(1, value.length)
 }


 export default connect(mapStateToProps)(AddListing)