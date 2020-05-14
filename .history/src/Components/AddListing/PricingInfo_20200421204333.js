import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Col from 'react-bootstrap/Col'
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


    onHandleSubmit = async () => {
        this.props.addFormInfo(this.state, "pricingInfo")
    }


    handleChange = async event => {
        await this.setState({[event.target.name]: event.target.value })
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                            
                <h3 style={{}}>3. Pricing Info</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                    <form>

                    <strong>Asking price, if for sale?</strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="askingPrice"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.askingPrice} onChange={this.handleChange} />
                        </div>

                        <strong>Asking price per square foot, if for lease?</strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="leasePricePerSquareFoot"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.leasePricePerSquareFoot} onChange={this.handleChange} />
                        </div>

                        <strong>If for lease, duration of the initial lease term and available renewal options, if any?</strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="leaseTermDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.leaseTermDetails} onChange={this.handleChange} />
                        </div>
                        
                        <strong>Common area maintenance costs, per square foot?</strong>
                        <div className="inputGroup">
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="maintainenceCostPerSquareFoot"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.maintainenceCostPerSquareFoot} onChange={this.handleChange} />
                        </div>

                        <strong>Property insurance costs per square foot, if lease?</strong>
                        <div className="inputGroup" >
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="insuranceCostPerSquareFoot"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.insuranceCostPerSquareFoot} onChange={this.handleChange} />
                        </div>

                        <strong>Is this an assignment?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.isAssignment =="yes" } name="isAssignment" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.isAssignment == "no" } name="isAssignment" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Is this an sublet?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.isSublet =="yes" } name="isSublet" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.isSublet == "no" } name="isSublet" value={'no'} onChange={this.handleChange} /></label>
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