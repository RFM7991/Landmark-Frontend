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
        
        console.log("data", this.props.photos.contact_photos)
        let formData = new FormData();
        formData.append("listingId", ''+listingId)
        formData.append("contact_photos", this.props.photos.contact_photos);
        formData.append("site_photos", this.props.photos.site_photos);

        // Log the key/value pairs
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ' : ' + pair[1]); 
        }

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
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                   {JSON.stringify(this.props.formData)}
                </div>
                <br></br>
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