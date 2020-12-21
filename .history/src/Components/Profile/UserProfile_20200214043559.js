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
import Form from "react-bootstrap/Form"
import {editUser} from '../../Requests/users-requests'
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
            validated: false,
            editMode : false
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

        this.setState({[e.target.name]: update})
    }


    handleSubmit = async (event) => {
        const form = event.currentTarget;
        let isValid = true;
       
       
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {

                 // stop default for failed custom validation
                let results = await editUser(this.state, this.props.user._id )
                console.log('EDIT RESULTS', results)

                // email error
                if (results.emailError == 'Email taken') {
                    if (this.state.email.target != undefined) {
                        this.state.email.target.setCustomValidity('Email taken')
                    }
                    this.setState({ email: {...this.state.email, message: 'Email taken' }})
                    isValid = false
                }

                // username error
                if (results.usernameError == 'Username taken') {
                    if (this.state.username.target != undefined) {
                        this.state.username.target.setCustomValidity('Username taken')
                    }
                    this.setState({ email: {...this.state.email, message: 'Username taken' }})
                    isValid = false
                }

                if (isValid) {
                    await this.onUpdateUser(results[0])
                    this.props.history.push('/')
                }
                this.setState({validated: true});
                
    }

    handleEdit = () => {
        this.setState({ editMode : true})
    }

    handleCancel = () => {
        this.setState({ editMode : false})
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
                            {!this.state.editMode && 
                            <Form.Control 
                                disabled
                                required
                                type="text" 
                                name="first" 
                                placeholder={this.props.user.first}
                                autoFocus
                                value={this.state.first.value}
                                
                                onChange={this.onFormChange} 
                            />
                            }
                            {this.state.editMode && 
                            <Form.Control
                                required
                                type="text" 
                                name="first" 
                                placeholder={this.props.user.first}
                                autoFocus
                                value={this.state.first.value}
                                
                                onChange={this.onFormChange} 
                            />
                            }
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Last Name</Form.Label>
                            {!this.state.editMode && 
                            <Form.Control 
                                disabled
                                required
                                type="text" 
                                name="last" 
                                placeholder={this.props.user.last}
                                value={this.state.last.value}
                                onChange={this.onFormChange}/>
                            }{this.state.editMode && 
                                <Form.Control 
                                    required
                                    type="text" 
                                    name="last" 
                                    placeholder={this.props.user.last}
                                    value={this.state.last.value}
                                    onChange={this.onFormChange}/>
                                }

                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Username</Form.Label>
                    {!this.state.editMode && 
                        <Form.Control 
                            disabled
                            required
                            type="text"
                            name="username" 
                            placeholder={this.props.user.username}
                            value={this.state.username.value}
                            onChange={this.onFormChange} 
                        />
                    }
                    
                        {this.state.editMode &&
                        <Form.Control 
                            required
                            type="text"
                            name="username" 
                            placeholder={this.props.user.username}
                            value={this.state.username.value}
                            onChange={this.onFormChange} 
                        />
                        }
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.username.message}
                          </span>
                </Form.Group>
                <Form.Group controlId="Username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Email</Form.Label>
                    {!this.state.editMode &&  <Form.Control 
                        disabled
                        required
                        type="email" 
                        name="email" 
                        placeholder={this.props.user.email}
                        value={this.state.email.value}
                        onChange={this.onFormChange} />
                    }
                    {this.state.editMode &&  <Form.Control 
                        required
                        type="email" 
                        name="email" 
                        placeholder={this.props.user.email}
                        value={this.state.email.value}
                        onChange={this.onFormChange} />
                    }
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.email.message}
                          </span>
                </Form.Group>
                {!this.state.editMode &&
                    <Button variant="primary" onClick={this.handleEdit} style={{ color: 'whitesmoke', fontSize: '20px'}}>
                        Edit
                    </Button>
                }
                {this.state.editMode &&
                    <Button variant="danger" onClick={this.handleCancel} style={{ color: 'whitesmoke', fontSize: '20px'}}>
                        Cancel
                    </Button>
                }
                {this.state.editMode &&
                <Button variant="primary" type="submit" style={{ marginLeft: '2em', color: 'whitesmoke', fontSize: '20px'}}>
                    Submit
                </Button>
                }
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