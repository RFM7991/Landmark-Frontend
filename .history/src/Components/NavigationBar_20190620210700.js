import React from './node_modules/reacte_modules/react';
import Navbar from './node_modules/react-bootstrap/Navbarootstrap/Navbar'
import Form from './node_modules/react-bootstrap/Form-bootstrap/Form'
import Nav from './node_modules/react-bootstrap/Navt-bootstrap/Nav'
import NavDropdown from './node_modules/react-bootstrap/NavDropdownrap/NavDropdown'
import FormControl from './node_modules/react-bootstrap/FormControlrap/FormControl'
import Button from './node_modules/react-bootstrap/Buttonootstrap/Button'


class NavigationBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Project Landmark</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavigationBar;
