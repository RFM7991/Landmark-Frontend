import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"
import { loginUser } from '../../Requests/users-requests'
import * as selectors from '../../Reducers/selectors'
import { updateUser } from '../../Actions/user-actions';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link, withRouter } from 'react-router-dom'
import { getUserInfo } from '../../Requests/users-requests'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: { value: '', isValid: true, message: '', target: '' },
            password: { value: '', isValid: true, message: '', target: '' },
            validated: false
        
        };
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

    onUpdateUser = async (user) => {
        localStorage.clear()
        localStorage.setItem('user', JSON.stringify(user))
        // fetch user info and set searches in local storage
        let userInfo = await getUserInfo(user._id)
        console.log('USER INFO', userInfo.res[0])
        if (userInfo.res[0].recentSearches.length > 0) {
            await this.setState({ searches : userInfo.res[0].searches})
            localStorage.setItem('recentSearches', JSON.stringify(userInfo.res[0].recentSearches))
        }
        this.props.onUpdateUser(user)
    }

    submitForm = async () => {
        console.log(this.state.email, this.state.password)
        if (this.state.email.length > 0 && this.state.password.length > 0) {
            let results = await loginUser(this.state.email, this.state.password)

            console.log('LOGIN RESULTS', results.res.length)
            if (results.res.length > 0) {
                await this.onUpdateUser(results.res[0])
                this.props.history.push('/')
            }
        }
    }

    handleSubmit = async (event) => {
        const form = event.currentTarget;
        let isValid = true;
       
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } 

        console.log('SUBMIT')

        if (form.checkValidity()) {
            event.preventDefault()
            if (isValid) {
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
                } else {
                if (results.res.length > 0) {
                await this.onUpdateUser(results.res[0])
                this.props.history.push('/')
                }
            }
            }
        }
        
        this.setState({validated: true});
      };

    render() {
 
        return (
            <div style={{ zIndex: 2, 
                width: '30%'}}>
                <h1 style={{marginBottom: '1em'}}>Login</h1>
            <div style={{ zIndex: 2, 
            border: '2px solid ' + lightBg,
            borderRadius: '10px',
            backgroundColor: 'rgba(225,225,225, 0.7)',
            padding: '2em'}}>
               <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    autoFocus
                    required
                    name="email"
                    value={this.state.email.value}
                    onChange={this.onFormChange}
                    />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.email.message}
                          </span>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg}}>Password</Form.Label>
                    <Form.Control 
                    name="password"
                    required
                    value={this.state.password.value}
                    type="password" 
                    placeholder="Password" 
                    onChange={this.onFormChange}/>
                    <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.password.message}
                          </span>
                </Form.Group>
                <a style={{fontSize: '16px', float: 'left'}} href=''>Forgot Password?</a>
                <br></br>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br></br>
                <br></br>
                <span style={{fontSize: '20px', color: lightBg}}>New User?	&nbsp;</span>
                <Link style={{fontSize: '20px'}} to="/register">Create an Account</Link> 
            </Form>
            </div>
          
            </div>
        );
    }
}


const mapStateToProps = createSelector(
    selectors.userSelector,
    (user) => ({
        user
    })
)

const mapActionsToProps = {
    onUpdateUser: updateUser
};

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login));
