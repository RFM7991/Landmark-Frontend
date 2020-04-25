import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import Col from 'react-bootstrap/Col'
import '../../css/addListing.css';
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import { createListing } from "../../Requests/listings-requests"
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


    handleSubmit = async () => {
        let res = await createListing(this.props.formData)
        console.log("create_listing", res)
    }


    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                            
                <h3 style={{}}>4. Review and Submit</h3>
                <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                   {JSON.stringify(this.props.formData)}
                </div>
                <br></br>
                <Button variant="primary" onClick={this.onHandleSubmit} 
                    disabled={this.state.disabled}
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