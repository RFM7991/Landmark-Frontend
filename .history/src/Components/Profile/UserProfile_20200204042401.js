import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import SubwayIcon from '../../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Button from 'react-bootstrap/Button'
import { getComments, createComment } from '../../Requests/locations-requests'
import UserProfile from './UserProfile'
import { Link, withRouter } from 'react-router-dom'
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'


class ProfilePanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            first: { value: this.props.user.first, isValid: true, message: '' },
            last: { value: this.props.user.last, isValid: true, message: '' },
            username: { value: this.props.user.username, isValid: true, message: '' },
            email: { value: this.props.user.email, isValid: true, message: '' },
            validated: false
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


    onFormChange = (e) => {
        let update = { ...this.state[e.target.name]}

        update.value = e.target.value
        update.target = e.target

        // reset custom validation on change 
        if (update.message.length > 1) {
            update.target.setCustomValidity('')
            update.message = ''
        }

        // reset password error on email change
        if (e.target.name == 'email') {
            if (this.state.password.message.length > 0) {
                this.state.password.target.setCustomValidity('')
                this.setState({ password : {...this.state.password, message : ''}})
            }
        }

        this.setState({[e.target.name]: update})
    }


    handleSubmit = async (event) => {
        const form = event.currentTarget;
        let isValid = true;
       
       
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {

                 // stop default for failed custom validation
                let results = await loginUser(this.state.email.value, this.state.password.value)
                console.log('LOGIN RESULTS', results)
                if (results.error != undefined) {
                    switch (results.error) {
                        case 'Email not found': 
                            if (this.state.email.target != undefined) {
                                this.state.email.target.setCustomValidity('Username not found')
                            }
                            this.setState({ email: {...this.state.email, message: 'Username not found' }})
                            break;
                        
                        case 'Password not found': 
                            if (this.state.password.target != undefined) {
                                this.state.password.target.setCustomValidity('Password not found')
                            }
                            this.setState({ password: {...this.state.password, message: 'Password not found' }})
                            break;

                        default: break;
                    }
                    this.setState({validated: true});
                } else {
                if (results.length > 0) {
                    await this.onUpdateUser(results[0])
                    this.props.history.push('/')
                }
            }
        } else this.setState({ validated : true})
    }


    render() {
        return (
            <div style={{ width: '100%', height: '100%',
            display: 'columns', alignItems: 'center',  justifyContent: 'center', backgroundColor: 'whitesmoke'}}>
                <div style={{ marginTop: '4em'}}>
                  <img src={'https://media-exp1.licdn.com/dms/image/C4E03AQGIviyGnEnlyQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=RIDnoFwrm22DeH-yGzlaZvLewKS6MDXIza6YrWK5GOQ'} 
                    width={100} height={100} style={{borderRadius: 45}}/>
                </div>
                <div style={{ fontSize: 16, color: 'black',  width: '50%', margin: 'auto', marginTop: '2em'}}>
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
               <Row>
                    <Col>
                        <Form.Group controlId="firstName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>First Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                name="first" 
                                placeholder="First name" 
                                autoFocus
                                value={this.state.first.value}
                                
                                onChange={this.onFormChange} 
                            />
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Last Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                name="last" 
                                placeholder="Last name" 
                                value={this.state.last.value}
                                onChange={this.onFormChange}/>
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Username</Form.Label>
                    <Form.Control 
                        required
                        type="text"
                        name="username" 
                        placeholder="Enter username" 
                        value={this.state.username.value}
                        onChange={this.onFormChange} 
                        />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.username.message}
                          </span>
                </Form.Group>
                <Form.Group controlId="Username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Email</Form.Label>
                    <Form.Control 
                        required
                        type="email" 
                        name="email" 
                        placeholder="Enter email"
                        value={this.state.email.value}
                        onChange={this.onFormChange} />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.email.message}
                          </span>
                </Form.Group>
                <Button variant="primary" type="submit" style={{ color: 'whitesmoke', fontSize: '20px'}}>
                    Submit
                </Button>
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