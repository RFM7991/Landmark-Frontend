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
            first: "",
            last: "",
            username: "",
            email: "",
            password: "",
            password_confirm: "",
            isReady: false
        };
    }

    async componentDidMount() {
   
    }

    onFormChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        console.log('Register', this.state)
        return (
            <div style={{ zIndex: 2, 
                width: '30%'}}>
                <h1 style={{marginBottom: '1em'}}>Create an Account</h1>
            <div style={{ zIndex: 2, 
            border: '2px solid ' + lightBg,
            borderRadius: '10px',
            backgroundColor: 'rgba(225,225,225, 0.5)',
            padding: '2em'}}>
               <Form>
               <Row>
                    <Col>
                        <Form.Group controlId="firstName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>First Name</Form.Label>
                            <Form.Control type="text" name="first" placeholder="First name" onChange={this.onFormChange} />
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName" >
                            <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Last Name</Form.Label>
                            <Form.Control type="text" name="last" placeholder="Last name" onChange={this.onFormChange}/>
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter username" onChange={this.onFormChange} />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="Username" >
                    <Form.Label style={{float: 'left', color: lightBg, fontSize: '24px'}}>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={this.onFormChange} />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg, fontSize: '24px'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onFormChange}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg, fontSize: '24px'}}> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={this.onFormChange}/>
                </Form.Group>
                <Form.Group id="formGridCheckbox" style={{float: 'left', color: lightBg, fontSize: '24px'}}>
                    <Form.Check type="checkbox" label="Subscribe to our email list" />
                </Form.Group >
                <Button variant="primary" type="submit" style={{ color: 'whitesmoke', fontSize: '20px', marginTop: '2em', textAlign: 'center'}}>
                    Submit
                </Button>
                <br></br>
                
                <span style={{fontSize: '20px', color: lightBg}}>Already have an account?</span>
                <a style={{fontSize: '20px'}} href='/login'> Login here</a>
            </Form>
            </div>
          
            </div>
        );
    }
}

export default Register;
