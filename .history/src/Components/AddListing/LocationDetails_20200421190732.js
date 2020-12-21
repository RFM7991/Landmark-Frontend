import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
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

    handleSubmit = async () => {
    }

    handleChange = async e => {
        await this.setState({[e.target.name]: e.target.value})

        console.log("form_state", this.state)
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>            
                <h3 style={{}}>2. Location Details</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                    <form>
                    <strong>Size of location</strong>
                        <div className="inputGroup"  style={{width: '70%'}}>
                            <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                name="sizeDetails"
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.sizeDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>
                    <strong>Dimensions</strong>
                    <div className="inputGroup"  style={{width: '70%'}}>
                        <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                            type="text" 
                            name="dimensionDetails"
                            multiline
                            placeholder="Enter any additional contact information that is relevant to this listing"
                            value={this.state.dimensionDetails} onChange={this.handleChange} />
                    </div>
                    <p style={{ fontSize: '12px'}}>120 characters max</p>

                    <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                    </div>
                    
                        <strong>Position of space</strong>
                        <div className="inputGroup">
                            <label>End cap<input type="checkbox" checked={this.state.position == "end cap" } name="position" value={'end cap'} onChange={this.handleChange} /></label>
                            <label>In-line<input type="checkbox" checked={this.state.position == "in-line" } name="position" value={'in-line'} onChange={this.handleChange} /></label>
                            <label>Free standing<input type="checkbox" checked={this.state.position == "free standing" } name="position" value={'free standing'} onChange={this.handleChange} /></label>
                            <label>(city) corner<input type="checkbox" checked={this.state.position == "corner" } name="position" value={'corner'} onChange={this.handleChange} /></label>
                            <label>(city) mid block<input type="checkbox" checked={this.state.position == "mid block" } name="position" value={'mid block'} onChange={this.handleChange} /></label>
                            <label>other<input type="checkbox" checked={this.state.position == "other" } name="position" value={'other'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Tenent mix</strong>
                        <div className="inputGroup" style={{width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="tenantMixDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.tenantMix} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Number of parking spaces available, if applicable? </strong>
                        <div className="inputGroup" style={{width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="parkingSpaceDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.parkingSpaceDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Designated Parking? </strong>
                        <div className="inputGroup" style={{width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="designatedParkingDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
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
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>
                        <br></br>
                        <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                        </div>

                        <strong>If existing structure, what date was it built, if available? </strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="120" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>120 characters max</p>

                        <strong>Means of ingress and egress for strip center, mall of free-standing unit? Please specify.</strong>
                        <div className="inputGroup" style={{ width: '70%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                        </div>

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
                                placeholder="Enter any additional zoning information"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>
                        <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                        </div>

                        <strong>Type and dimensions of sign/signs permitted?</strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                        </div>
                    </form>
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


 export default connect(mapStateToProps)(AddListing)