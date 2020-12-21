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
            disabled: true,
        }
    }


    onHandleSubmit = async () => {
        this.props.addFormInfo(this.state, "contactInfo")
    }

    handleChange = async event => {
        await this.setState({[event.target.name]: event.target.value })

        if (this.state.forSale != undefined 
            &&  this.state.forLease != undefined
            && this.state.relationship != undefined 
            && this.state.ownershipDetails != undefined) {

            this.setState({ disabled : false })
        }
    }

    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                            
                <h3 style={{}}>1. Owner/Broker Contact Info</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                    <form>
                        <strong>Is the property for sale?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.forSale =="yes" } name="forSale" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.forSale == "no" } name="forSale" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Is the property for lease?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={ this.state.forLease == "yes" } name="forLease" value={'yes'} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" checked={this.state.forLease == "no" } name="forLease" value={'no'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>What is your relationship to this property?</strong>
                        <div className="inputGroup" style={{ width: '100%'}}>
                            <label>I am the broker<input type="checkbox" name="relationship" checked={this.state.relationship == 'broker'} value={'broker'} onChange={this.handleChange} /></label>
                            <label>I am the landlord<input type="checkbox" name="relationship"checked={this.state.relationship == 'landlord'} value={'landlord'} onChange={this.handleChange} /></label>
                            <label>other<input type="checkbox" name="relationship" checked={this.state.relationship == 'other'} value={'other'} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Additional info</strong>
                        <div className="inputGroup" style={{width: '100%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                multiline
                                name="ownershipDetails"
                                placeholder="Enter any additional contact information that is relevant to this listing"
                                value={this.state.ownershipDetails} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <div class="form-group files color" style={{ width: '100%'}}>
                            <input type="file" className="form-control" multiple=""/>
                        </div>
                    </form>
                </div>

                <Button variant="primary" onClick={this.onHandleSubmit} 
                    disabled={this.state.disabled}
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