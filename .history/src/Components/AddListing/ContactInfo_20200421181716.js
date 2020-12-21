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
            searches: [],
            body: '',
            forSale: false
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

    handleCheckChange = event => {
        console.log("change_event1", event.target.value === true)
        console.log("change_event2", this.state[event.target.name])
        this.setState({[event.target.name]: event.target.value})
    }

    componentDidUpdate(prevProps) {
    }




    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                            
                <h3 style={{}}>1. Owner/Broker Contact Info</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                    <form>
                        <strong>Is the property for sale?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" checked={this.state.forSale} name="forSale" value={'true'} onChange={this.handleCheckChange} /></label>
                            <label>no<input type="checkbox" checked={!this.state.forSale} name="forSale" value={false} onChange={this.handleCheckChange} /></label>
                        </div>

                        <strong>Is the property for lease?</strong>
                        <div className="inputGroup">
                            <label>yes<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>no<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>

                        <strong>What is your relationship to this property?</strong>
                        <div className="inputGroup">
                            <label>I am the broker<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>I am the landlord<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                            <label>other<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                        </div>

                        <strong>Additional info</strong>
                        <div className="inputGroup" style={{width: '100%'}}>
                            <textarea maxLength="240" style={{ marginLeft: '0em', width: '100%', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                type="text" 
                                
                                multiline
                            placeholder="Enter any additional contact information that is relevant to this listing"
                            value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <p style={{ fontSize: '12px'}}>240 characters max</p>

                        <div class="form-group files color" style={{ width: '100%'}}>
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