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
            searches: [],
            body: ''
        }
    }

    async componentDidMount() {
        let searches = localStorage.getItem('recentSearches')
        if (searches != null) {
            this.setState({ searches : JSON.parse(searches)})
        }
    }

    handleSubmit = async () => {
    }

    handleChange = e => {
        this.setState({body: e.target.value})
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
                        <div className="inputGroup"  style={{width: '100%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.sizeDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>
                    <strong>Dimensions</strong>
                    <div className="inputGroup"  style={{width: '100%'}}>
                        <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '50px', padding: '0.25em', fontSize: '14px'}}
                            type="text" 
                            multiline
                            placeholder="Enter any additional contact information that is relevant to this listing"
                            value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <p style={{ fontSize: '12px'}}>240 characters max</p>
                    <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                    </div>

                        <strong>Position of space</strong>
                        <div className="inputGroup">
                            <label>End cap<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>In-line<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>Free standing<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>(city) corner<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>(city) mid block<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>Other<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Tenent mix</strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>

                        <strong>Number of parking spaces available, if applicable? </strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <strong>Designated Parking? </strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        
                        <strong>Is the location under construction? Yes or No. If yes, estimated completion date? </strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>

                        <div class="form-group files color">
                            <input type="file" className="form-control" multiple=""/>
                        </div>

                        <strong>If existing structure, what date was it built, if available? </strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <strong>Means of ingress and egress for strip center, mall of free-standing unit? Please specify.</strong>
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

                        <strong>Does this space have a certificate of occupancy?</strong>
                        <div className="inputGroup">
                            <label>Yes<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>No<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Zoning usuage allowed?</strong>
                        <div className="inputGroup">
                            <label>Yes<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>No<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>
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