import React from './node_modules/react';
import Button from "./node_modules/react-bootstrap/Button";
import Form from "./node_modules/react-bootstrap/Form"
import FormGroup from "./node_modules/react-bootstrap/FormGroup";
import FormControl from "./node_modules/react-bootstrap/FormControl"
import FormLabel from "./node_modules/react-bootstrap/FormLabel"

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
            <div style={{ zIndex: 2, width: '15%'}}>
               <Form>
                   <FormGroup controlId="email" bsSize="large">
                        <FormLabel>Email/Username</FormLabel>
                        <FormControl
                         autoFocus
                         type="email"
                         value={this.state.email}
                         placeholder='youremail@gmail.com'
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
                   <a href={'/register'} style={{fontSize: '16px', marginTop: '10px'}}>Create an Account</a>
               </Form>
            </div>
        );
    }
}

export default Login;
