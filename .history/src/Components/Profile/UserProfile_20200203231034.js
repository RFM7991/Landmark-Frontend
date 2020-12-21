import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import SubwayIcon from '../../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getComments, createComment } from '../../Requests/locations-requests'
import UserProfile from './UserProfile'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ProfilePanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: ''
        }
    }

    async componentDidMount() {
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
            <div style={{ width: '100%', height: '100%',
            display: 'columns', alignItems: 'center',  justifyContent: 'center', backgroundColor: 'whitesmoke'}}>
                <div style={{ marginTop: '4em'}}>
                  <img src={'https://media-exp1.licdn.com/dms/image/C4E03AQGIviyGnEnlyQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=RIDnoFwrm22DeH-yGzlaZvLewKS6MDXIza6YrWK5GOQ'} 
                    width={100} height={100} style={{borderRadius: 45}}/>
                </div>
                <div style={{ fontSize: 16, color: 'black', textAlign: 'left', width: '50%', margin: 'auto', marginTop: '2em'}}>
                <Form>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    autoFocus
                    name="email"
                    value={this.state.email}
                    onChange={this.onFormChange}
                    />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg}}>Password</Form.Label>
                    <Form.Control 
                    name="password"
                    value={this.state.password}
                    type="password" 
                    placeholder="Password" 
                    onChange={this.onFormChange}/>
                </Form.Group>
                <a style={{fontSize: '16px', float: 'left'}} href=''>Forgot Password?</a>
                <br></br>
                <Button variant="primary" onClick={this.submitForm}>
                    Submit
                </Button>
                <br></br>
                <span style={{fontSize: '20px', color: lightBg}}>New User?	&nbsp;</span>
                <Link style={{fontSize: '20px'}} to="/register">Create an Account</Link> 
            </Form>
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


 export default connect(mapStateToProps)(ProfilePanel)