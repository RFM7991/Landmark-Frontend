import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import * as selectors from '../Reducers/selectors'
import { createSelector } from 'reselect';
import { updateUser } from '../Actions/user-actions';

const darkBg = 'rgb(26,28,41)'
const navBg = 'linear-gradient(225deg, rgba(2,0,36,1) 0%, rgba(6,6,73,1) 63%, rgba(0,212,255,1) 100%)'
const textPrimary = 'whitesmoke'


class NavigationBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    onUpdateUser = (user) => {
        this.props.onUpdateUser(user)
    }

    logout = () => {
        this.props.history.push('/login')
        let user = {_id: -1, username: 'guest', is_admin: false}
        this.onUpdateUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }


    render() {
        return (
            <Navbar style={{background: navBg}} expand="lg">
                <Link to="/" style={{color: "whitesmoke", fontWeight: 'bold',  stroke: 'black', strokeWidth: 2, fontFamily: 'Tahoma, Geneva, sans-serif'}}>Landmark</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                {this.props.user._id == -1 && <Button  onClick={(e) => this.props.history.push('/login')} style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>Login</Button> }
                {this.props.user._id != -1 && <NavBarDropDown user={this.props.user} logout={this.logout}/>} 
            </Navbar>
        );
    }

}

const mapStateToProps = createSelector(
    selectors.userSelector,
    (user) => ({
        user
    })
)

const mapActionsToProps = {
    onUpdateUser: updateUser
};

const NavBarDropDown = props => {
    console.log('USER', props.user)

    

    return <NavDropdown title={<span style={{ color: 'whitesmoke'}}>'Welcome, ' + props.user.first</span>} id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Recent Searches</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={props.logout}>Sign Out</NavDropdown.Item>
        </NavDropdown> 
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(NavigationBar));
