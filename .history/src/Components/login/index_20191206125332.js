import React from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import FormGroup from "react-bootstrap/FormGroup";
import FormControl from "react-bootstrap/FormControl"
import FormLabel from "react-bootstrap/FormLabel"

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
                width: '25%', 
            border: '1px solid black',
            borderRadius: '1',
            padding: '2em'}}>
               <Form>
                <Form.Group controlId="formBasicEmail" >
                    <Form.Label style={{float: 'left'}}>Email / Username</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted" style={{}}>
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label  style={{float: 'left'}}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <br></br>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        );
    }
}

export default Login;
