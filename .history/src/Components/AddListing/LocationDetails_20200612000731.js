import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PhotoUploader from './PhotoUploader'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            
        }
    }

    handleChange = async e => {
        await this.setState({[e.target.name]: e.target.value})
        this.props.addFormInfo(this.state, "locationDetails")
    }

    handleSetPhotos = photos => {
        this.props.handleSetPhotos('site_photos', photos)
    }

    handleSetCoverPhotos = photos => {
        this.props.handleSetPhotos('cover_photos', photos)
    }

    removePhoto = index => {
        this.props.handleRemovePhoto('site_photos', index)
    }


    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>            
                <h3>2. Location Details</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                    <form>
                    <strong>Upload Cover Photos</strong>
                    <p>These will be the first photos users see for your listing</p>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            
                                <PhotoUploader setPhotos={this.handleSetCoverPhotos}/>
                        </div>
                    <strong>Size of location</strong>
                        <div className="inputGroup"  >
                            <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                name="sizeDetails"
                                multiline
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.sizeDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>
                    <strong>Dimensions</strong>
                    <div className="inputGroup" >
                        <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                            type="text" 
                            name="dimensionDetails"
                            multiline
                            placeholder="Enter any additional information that is relevant to this listing"
                            value={this.state.dimensionDetails} onChange={this.handleChange} />
                    </div>
                    <p style={{ fontSize: '12px'}}>120 characters max</p>

                    
                    <strong>Upload Site Photos</strong>
                    <p>This can include site plans, and other relevant photos to the site's dimensions</p>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            <PhotoUploader setPhotos={this.handleSetPhotos}/>
                      
                    
                        <strong>Position of space</strong>
                        <div className="inputGroup" style={{ width: '100%'}}>
                            <label>End cap<input type="checkbox" checked={this.state.position == "end cap" } name="position" value={'end cap'} onChange={this.handleChange} /></label>
                            <label>In-line<input type="checkbox" checked={this.state.position == "in-line" } name="position" value={'in-line'} onChange={this.handleChange} /></label>
                            <label>Free standing<input type="checkbox" checked={this.state.position == "free standing" } name="position" value={'free standing'} onChange={this.handleChange} /></label>
                            <label>(city) corner<input type="checkbox" checked={this.state.position == "corner" } name="position" value={'corner'} onChange={this.handleChange} /></label>
                            <label>(city) mid block<input type="checkbox" checked={this.state.position == "mid block" } name="position" value={'mid block'} onChange={this.handleChange} /></label>
                            <label>other<input type="checkbox" checked={this.state.position == "other" } name="position" value={'other'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Tenant mix</strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="tenantMixDetails"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.tenantMix} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Number of parking spaces available, if applicable? </strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="parkingSpaceDetails"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.parkingSpaceDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Designated Parking? </strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="designatedParkingDetails"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.designatedParkingDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>
                        <strong>Is the location under construction?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.underConstruction =="yes" } name="underConstruction" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.underConstruction == "no" } name="underConstruction" value={'no'} onChange={this.handleChange} /></label>
                        </div>
                        <strong>If yes, estimated completion date? </strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="estimatedCompletionDate"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.estimatedCompletionDate} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>
                        <br></br>
                 
                            <strong>Upload Constuction Photos</strong>
                            <p>If relevant, uplaod any photos of the what the location will like look once its completed</p>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            <PhotoUploader setPhotos={this.handleSetPhotos}/>
                       

                        <strong>If existing structure, what date was it built, if available? </strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="dateOfConstruction"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.dateOfConstruction} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>

                        <strong>Means of ingress and egress for strip center, mall of free-standing unit? Please specify.</strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="ingressInfo"
                                placeholder="Enter any additional information that is relevant to this listing"
                                value={this.state.ingressInfo} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

              
                        <strong>Upload Constuction Photos</strong>
                            <p>If relevant, uplaod any photos of the what the location will like look once its completed</p>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            <PhotoUploader setPhotos={this.handleSetPhotos}/>
                     

                        <strong>Does this space have a certificate of occupancy?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.hasOccupancyCert =="yes" } name="hasOccupancyCert" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.hasOccupancyCert == "no" } name="hasOccupancyCert" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Zoning usuage allowed?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.hasZoning =="yes" } name="hasZoning" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.hasZoning == "no" } name="hasZoning" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="zoningDetails"
                                placeholder="Enter any additional zoning information"
                                value={this.state.zoningDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>
                        <div>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            <PhotoUploader setPhotos={this.handleSetPhotos}/>
                        </div>

                        <strong>Type and dimensions of sign/signs permitted?</strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="signDetails"
                                placeholder="Enter any additional  information that is relevant to this listing"
                                value={this.state.signDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <div>
                            {this.props.photos.map((e, i) => {
                                return (
                                    <div key={e +'_'+i} style={{display : 'flex', flexDirection : 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5em'}}>
                                        <Button variant="danger" onClick={() => this.removePhoto(i)} 
                                            style={{ alignSelf: 'center', fontSize: 12 }}>
                                           X
                                        </Button>
                                        <div style={{ textAlign: 'center', alignSelf: 'center', marginLeft: '1em', fontSize: 12}}>{e.name}</div>
                                    </div>
                                )
                            })}
                            <PhotoUploader setPhotos={this.handleSetPhotos}/>
                        </div>
                    </form>
                </div>
                <Button variant="primary" onClick={this.props.handleNext} 
                    style={{backgroundColor:'#00d4ff', fontWeight: 'bold', alignSelf: 'center', marginRight: '1em', marginBottom : '1em' }}>
                    Next
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