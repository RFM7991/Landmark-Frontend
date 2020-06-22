import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Col from 'react-bootstrap/Col'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import { createListing,  setListingPhotos} from "../../Requests/listings-requests"
import Button from 'react-bootstrap/Button'
import PropogateLoader from '../UI/ProppgateLoader'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            loading : false,
            error : true,
            errorMessage : "test error"
        }
    }

    handleUploadPhotos = async (listingId) => {
        
        let formData = new FormData();
        formData.append("listingId", ''+listingId)
        this.props.photos.contact_photos.forEach(e => formData.append("contact_photos", e))
        this.props.photos.site_photos.forEach(e => formData.append("site_photos", e))
        this.props.photos.cover_photos.forEach(e => formData.append("cover_photos", e))

        let res = await setListingPhotos(formData)
        console.log("UPLOAD_PHOTO", res)
    }
   

    handleSubmit = async () => {
        let error = false 
        let errormessage = ""
        this.setState({ loading : true })
        let data = {...this.props.formData, user_id : this.props.user._id }  // userid
    
        let res = await createListing(data).catch(e => { error = true; errormessage = e })

        if (error) {
            this.setState({ loading : false })
        }

        // upload photos
        if (res.listingId != undefined) {
            await this.handleUploadPhotos(res.listingId)
        }
       
        this.setState({ loading : false })
    }

    render() {
        console.log("SUBMIT_PROPS", this.props.photos)
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                <div style={{ borderBottom: '1px solid rgb(31,33,48)', width: '25%', textAlign: 'left'}}>       
                    <h3>Review and Submit</h3>
                </div> 
                <br></br>
                
                <div style={{ borderBottom: '1px solid rgb(31,33,48)', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>1. Contact Info</h3>
                </div> 
               
                    {this.props.formData.contactInfo != undefined &&
                        <Table striped bordered hover  className="listingDataTable">
                            <tbody>
                                {Object.entries(this.props.formData.contactInfo).map(([key, val], i) => {
                                    return (
                                        <tr><td>{formatKeys(key)}</td><td className="tableValue">{capitalizeFirst(val)}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    }

                    <h3 style={{ fontSize: '18px', marginBottom: '0.5em'}}>Contact Photos:</h3>
                    {this.props.photos.contact_photos.length > 0 &&
                        <div style={{ display: 'flex',  height: '270px', width: '100%',  overflowX: 'auto', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(242,242,242)' }}>
                            {this.props.photos.contact_photos.map((file, i) => {
                                return (
                                    <div style={{ minWidth: '225px', maxWidth: '225px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '0.5em'}}>
                                        <Image src={URL.createObjectURL(file)} style={{ width: '200px', height: '200px'}} />
                                        <p style={{ marginTop: '0.5em', fontSize: '12px'}}>{file.name}</p>
                                    </div> 
                                )
                            })
                            }
                        </div>
                    }

                <div style={{ borderBottom: '1px solid rgb(31,33,48)', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>2. location Details</h3>
                </div> 
                    {this.props.formData.locationDetails != undefined &&
                    <Table striped bordered hover  className="listingDataTable">
                        <tbody>
                            {Object.entries(this.props.formData.locationDetails).map(([key, val], i) => {
                                return (
                                    <tr><td>{formatKeys(key)}</td><td className="tableValue">{capitalizeFirst(val)}</td></tr>
                                )
                            })}
                        </tbody>
                    </Table> 
                    }

                <h3 style={{ fontSize: '18px', marginBottom: '0.5em'}}>Location Photos:</h3>
                {this.props.photos.site_photos.length > 0 &&
                    <div style={{ display: 'flex',  height: '270px', width: '100%',  overflowX: 'auto', flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgb(242,242,242)' }}>
                        {this.props.photos.site_photos.map((file, i) => {
                            return (
                                <div style={{ minWidth: '225px', maxWidth: '225px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '0.5em'}}>
                                    <Image src={URL.createObjectURL(file)} style={{ width: '200px', height: '200px'}} />
                                    <p style={{ marginTop: '0.5em', fontSize: '12px'}}>{file.name}</p>
                                </div> 
                            )
                        })
                        }
                    </div>
                }

                <div style={{ borderBottom: '1px solid rgb(31,33,48)', width: '20%', textAlign: 'left', marginTop: '3em' }}>       
                    <h3 style={{ fontSize: '24px' }}>3. Pricing and Terms</h3>
                </div> 
                    {this.props.formData.pricingInfo != undefined &&
                    <Table striped bordered hover  className="listingDataTable">
                    <tbody>
                        {Object.entries(this.props.formData.pricingInfo).map(([key, val], i) => {
                            return (
                                <tr><td>{formatKeys(key)}</td><td className="tableValue">{capitalizeFirst(val)}</td></tr>
                            )
                        })}
                    </tbody>
                </Table> 
                }   
                <div style={{ width: '100%', height: '100px', display: 'flex', flexDirection: 'column',  backgroundColor: 'blue', alignSelf: 'center'}}>
                    {this.state.error && <span style={{ flex: 1,color: 'red',  marginBottom: '4em'}}>{this.state.errorMessage}</span>}
                    {this.state.loading &&  <PropogateLoader color='#00D4FF' size={10} />}
                    {!this.state.loading && 
                    <div style={{ flex: 1}}>
                        <Button variant="primary" onClick={this.handleSubmit} 
                            style={{backgroundColor:'#00d4ff', fontWeight: 'bold',     }}>
                            Submit
                        </Button>
                        </div>
                    }
                </div>
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