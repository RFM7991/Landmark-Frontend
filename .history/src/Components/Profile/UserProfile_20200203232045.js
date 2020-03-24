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
import { Link, withRouter } from 'react-router-dom'
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
            email: { value: this.props.user.email, isValid: true, message: '' 
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

    render() {
        return (
            <div style={{ width: '100%', height: '100%',
            display: 'columns', alignItems: 'center',  justifyContent: 'center', backgroundColor: 'whitesmoke'}}>
                <div style={{ marginTop: '4em'}}>
                  <img src={'https://media-exp1.licdn.com/dms/image/C4E03AQGIviyGnEnlyQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=RIDnoFwrm22DeH-yGzlaZvLewKS6MDXIza6YrWK5GOQ'} 
                    width={100} height={100} style={{borderRadius: 45}}/>
                </div>
                <div style={{ fontSize: 16, color: 'black',  width: '50%', margin: 'auto', marginTop: '2em'}}>
                <Form>
                <Row>
                    <Col>
                        <Form.Group controlId="firstName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>First Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                name="first" 
                                placeholder={this.props.user.first}
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
                                value={this.props.user.last}
                                onChange={this.onFormChange}/>
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="username" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>User Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                name="last" 
                                placeholder={this.props.user.username} 
                                value={this.state.last.value}
                                onChange={this.onFormChange}/>
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    autoFocus
                    name="email"
                    value={this.state.email.value}
                    onChange={this.onFormChange}
                    />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>
                <a style={{fontSize: '16px', float: 'left'}} href=''>Forgot Password?</a>
                <br></br>
                <Button  variant="primary" onClick={this.submitForm}>
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