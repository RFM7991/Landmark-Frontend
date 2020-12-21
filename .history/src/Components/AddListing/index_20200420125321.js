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
            <div style={{ width: '100%', height: '100vh', backgroundColor: 'whitesmoke', 
            display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: 200,  backgroundColor: 'blue'}}>
                        <h3 style={{ color: 'white'}}>Listing Details</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>

                    <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                        
                        <h3 style={{}}>1. Owner/Broker Contact Info</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    For sale?
                                    <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
                                    <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
                                </label>
                                <label>
                                    For lease?
                                    <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
                                    <input type="checkbox" value={this.state.value} onChange={this.handleChange} />
                                </label>
                            </form>
                        </div>
                    </div>
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