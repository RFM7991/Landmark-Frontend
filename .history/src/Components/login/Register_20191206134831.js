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
            email: "",
            password: ""
        };
    }

    async componentDidMount() {
   
    }

    render() {
 
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
                            <Form.Label style={{float: 'left', color: lightBg}}>First ame</Form.Label>
                            <Form.Control type="text" placeholder="First name" />
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="lastName" >
                            <Form.Label style={{float: 'left', color: lightBg}}>Last Name</Form.Label>
                            <Form.Control type="email" placeholder="Last" />
                            <Form.Text className="text-muted" style={{}}>
                            </Form.Text>
                         </Form.Group>
                    </Col>
                </Row>
              
                <Form.Group controlId="username" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="Username" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg}}> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br></br>
                <span style={{fontSize: '20px', color: lightBg}}>Already have an account?</span>
                <a style={{fontSize: '20px'}} href='/register'> Login here</a>
            </Form>
            </div>
          
            </div>
        );
    }
}

export default Register;
