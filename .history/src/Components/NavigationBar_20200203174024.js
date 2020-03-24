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


    render() {
        let button;
        if (this.props.user._id == -1) {
             button = <Button  onClick={(e) => this.props.history.push('/login')} style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>Login</Button>
        } else {
             button = 
             <Button  onClick={(e) => {
              //   window.location='/Landmark-Frontend/login'
              this.props.history.push('/login')
                 let user = {_id: -1, username: 'guest', is_admin: false}
                 this.onUpdateUser(user)
                 localStorage.setItem('user', JSON.stringify(user))
                } 
                }
                  style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>Logout</Button>
        }
        
       

        return (
            <Navbar style={{background: navBg}} expand="lg">
                <Link to="/" style={{color: "whitesmoke", fontWeight: 'bold',  stroke: 'black', strokeWidth: 2, fontFamily: 'Tahoma, Geneva, sans-serif'}}>Landmark</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                </Navbar.Collapse>
                {this.props.user._id == -1 && button }
                {this.props.user._id != -1 && <NavBarDropDown user={this.props.user}/>} 
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

    return <NavDropdown style={{ color: 'whitesmoke'}} title={'Welcome, ' + props.user.first} id="basic-nav-dropdown">
            <NavDropdown.Divider />
            <NavDropdown.Item></NavDropdown.Item>
        </NavDropdown> 
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(NavigationBar));
