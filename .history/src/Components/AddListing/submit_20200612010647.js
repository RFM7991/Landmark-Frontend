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
        console.log("PHOTO_UPLOAD_RES", res)
    }
   

    handleSubmit = async () => {
        let res = await createListing(this.props.formData)

        console.log("create_listing", res)

        // upload photos
        if (res.listingId != undefined) {
            this.handleUploadPhotos(res.listingId)
        }
       
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                            
                <h3 style={{}}>4. Review and Submit</h3>
            
                <br></br>
                {this.props.formData.contactInfo != undefined &&
                <Table>
                    <th></th>
                    {Object.entries(this.props.formData.contactInfo).map(([key, val], i) => {
                        return (
                            <tr><td>{key}</td><td>{val}</td></tr>
                        )
                    })}
                </Table>
                }

                {this.props.formData.locationDetails != undefined &&
                <Table>
                    <th></th>
                    {Object.entries(this.props.formData.locationDetails).map(([key, val], i) => {
                        return (
                            <tr><td>{key}</td><td>{val}</td></tr>
                        )
                    })}
                </Table>
                }

                {this.props.formData.pricingInfo != undefined &&
                <Table>
                    <th></th>
                    {Object.entries(this.props.formData.pricingInfo).map(([key, val], i) => {
                        return (
                            <tr><td>{key}</td><td>{val}</td></tr>
                        )
                    })}
                </Table>
                }   

                <Button variant="primary" onClick={this.handleSubmit} 
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


 export default connect(mapStateToProps)(AddListing)