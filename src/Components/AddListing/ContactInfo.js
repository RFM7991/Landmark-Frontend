import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Button from 'react-bootstrap/Button'
import PhotoUploader from './PhotoUploader'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
        }
    }

    componentDidUpdate(prevProps) {
        const { updateInfo, isUpdate } = this.props
        if (prevProps.isUpdate !== isUpdate && JSON.stringify(updateInfo) !== JSON.stringify(this.state)) {
            this.setState({...updateInfo})
        }
    }

    handleChange = async event => {
        await this.setState({[event.target.name]: event.target.value })
        this.props.addFormInfo(this.state, "contactInfo")
    }

    handleSetPhotos = photos => {
        this.props.handleSetPhotos('contact_photos', photos)
    }

    removePhoto = index => {
        this.props.handleRemovePhoto('contact_photos', index)
    }

    render() {
        return (
            <div className="formPage">
                <h3>1. Owner/Broker Contact Info</h3>
                    <form style={{ padding: '16px'}}>
                        <strong>Is the property for sale? <span>*</span></strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.forSale =="yes" } name="forSale" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.forSale == "no" } name="forSale" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Is the property for lease? <span>*</span></strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={ this.state.forLease == "yes" } name="forLease" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.forLease == "no" } name="forLease" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>What is your relationship to this property? <span>*</span></strong>
                        <div className="inputGroup" >
                            <label>I am the broker<input type="checkbox" name="relationship" checked={this.state.relationship == 'broker'} value={'broker'} onChange={this.handleChange} /></label>
                            <label>I am the landlord<input type="checkbox" name="relationship"checked={this.state.relationship == 'landlord'} value={'landlord'} onChange={this.handleChange} /></label>
                            <label>other<input type="checkbox" name="relationship" checked={this.state.relationship == 'other'} value={'other'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Additional info</strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="ownershipDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.ownershipDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Upload a photo of yourself</strong>
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

                <Button variant="primary" onClick={this.props.handleNext} 
                    disabled={this.state.forSale == undefined || this.state.forLease == undefined || this.state.relationship == undefined}
                    className="nextButton">
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