import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"


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

    
    async componentDidMount() {
   
    }

    render() {
 
        return (
            <div style={{ zIndex: 2, 
                width: '25%'}}>
                <h1 style={{marginBottom: '1em'}}>Login</h1>
            <div style={{ zIndex: 2, 
            border: '1px solid black',
            borderRadius: '10px',
            backgroundColor: 'rgba(26,28,41, 0.8)',
            padding: '2em'}}>
               <Form>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left', color: 'rgb(181,193,228)'}}>Email / Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left', color: 'rgb(181,193,228)'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
            </div>
        );
    }
}

export default Login;
