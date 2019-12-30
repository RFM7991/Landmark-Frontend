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
            <div style={{ zIndex: 2, width: '20%'}}>
               <Form>
                   <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email</FormLabel>
                        <FormControl
                         autoFocus
                         type="email"
                         value={this.state.email}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            value={this.state.password}
                            type="password"
                        />
                   </FormGroup>
                   <Button block bsSize="large" type="submit">
                       Login
                   </Button>
                   <p style={{fontSize: '16px'}}>Create an Account</p>
               </Form>
            </div>
        );
    }
}

export default Login;
