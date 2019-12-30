import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"


const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class Register extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            first: { value: '', isValid: true, message: '' },
            last: { value: '', isValid: true, message: '' },
            username: { value: '', isValid: true, message: '' },
            email: { value: '', isValid: true, message: '' },
            password: { value: '', isValid: true, message: '' },
            password_confirm: { value: '', isValid: true, message: '' },
            validated: false
        };
    }

    async componentDidMount() {
   
    }

    onFormChange = (e) => {
        const state = {
            ...this.state,
            [e.target.name]: {
                ...this.state[e.target.name],
                value: e.target.value,
            }
        };

        if (e.target.name == 'password' || e.target.name == 'password_confirm') {
            if (e.target.value != state.password_confirm.value) {
                e.target.setCustomValidity('Passwords do not match')
            } else {
                e.target.setCustomValidity('')
            }
        }

        this.setState(state)
    }

    handleSubmit = (event) => {
        const form = event.currentTarget;
        const password = {...this.state.password}
        const password_confirm = {...this.state.password_confirm}
        let isValid = true;
       
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } 

        // additional custom validation
        if (this.state.password.value != this.state.password_confirm.value) {
            password.isValid = false
            password.message = 'Passwords do not match'
            isValid = false;
        }

        // stop default for failed custom validation
        if (!isValid) {
            this.setState({
                password: password
            })
        }

        if (form.checkValidity()) {
            event.preventDefault()
        }
        
        this.setState({validated: true});
      };
    

    render() {
        console.log('Register', this.state)
        return (
            <div style={{ zIndex: 2, 
                width: '30%'}}>
                <h1 style={{marginBottom: '1em'}}>Create an Account</h1>
            <div style={{ zIndex: 2, 
            border: '2px solid ' + lightBg,
            borderRadius: '10px',
            backgroundColor: 'rgba(225,225,225, 0.7)',
            padding: '2em'}}>
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
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg, fontSize: '24px'}}>Password</Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={this.state.password.value}
                        onChange={this.onFormChange}/>
                          <span type="invalid" style={{fontSize: '16px', color: 'red' }}>
                             {this.state.password.message}
                          </span>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg, fontSize: '24px'}}> Confirm Password</Form.Label>
                    <Form.Control 
                        required
                        type="password" 
                        name="password_confirm" 
                        placeholder="Password"
                        value={this.state.password_confirm.value}
                        onChange={this.onFormChange}/>
                </Form.Group>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Form.Group style={{float: 'left', color: lightBg, fontSize: '20px'}}>
                        <Form.Check
                        required
                        label="Agree to terms and conditions"
                        feedback="You must agree before submitting."
                        />
                    </Form.Group>
                    <Form.Group id="formGridCheckbox" style={{float: 'left', color: lightBg, fontSize: '20px'}}>
                        <Form.Check type="checkbox" label="Subscribe to our email list" />
                    </Form.Group>
                </div>
                <div style={{margin: 'auto', width: '10%', marginTop: '1.5em'}}>
                <Button variant="primary" type="submit" style={{ color: 'whitesmoke', fontSize: '20px'}}>
                    Submit
                </Button>
                </div>
            </Form>
                <span style={{fontSize: '20px', color: lightBg}}>Already have an account?</span>
                <a style={{fontSize: '20px'}} href='/login'> Login here</a>

            </div>
          
            </div>
        );
    }
}

export default Register;
