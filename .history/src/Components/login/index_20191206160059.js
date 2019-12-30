import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"
import { loginUser } from '../../Requests/users-requests'


const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class Login extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        };
    }

    onFormChange = (e) => {
        this.setState([e.target.name], e.target.value)
    }

    async componentDidMount() {
    }

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
               <Form>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left', color: lightBg}}>Email</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    autoFocus
                    value={this.state.email}
                    />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: lightBg}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <a style={{fontSize: '16px', float: 'left'}} href=''>Forgot Password?</a>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <br></br>
                <span style={{fontSize: '20px', color: lightBg}}>New User?</span>
                <a style={{fontSize: '20px'}} href='/register'> Create an Account</a>
            </Form>
            </div>
          
            </div>
        );
    }
}

export default Login;