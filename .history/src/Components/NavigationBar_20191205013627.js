import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


class NavigationBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/" style={{color: "whitesmoke"}}>Project Landmark</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Button  onClick={(e) => window.location='/login'} variant="light">Login</Button>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
