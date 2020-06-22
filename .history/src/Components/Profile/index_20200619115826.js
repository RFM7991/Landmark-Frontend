import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import SubwayIcon from '../../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getComments, createComment } from '../../Requests/locations-requests'
import RecentSearches from './RecentSearches';
import UserProfile from './UserProfile'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class Profile extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            index :  0
        }
    }

    async componentDidMount() {
        let searches = localStorage.getItem('recentSearches')
        if (searches != null) {
            this.setState({ searches : JSON.parse(searches)})
        }
    }

    handleSubmit = async () => {
    }

    handleChange = e => {
        this.setState({body: e.target.value})
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        let header =  <thead>
            <tr>
            </tr>
        </thead>
        return (
            <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgba(255,255,255, 0.9)', display: 'flex', flexDirection: 'row'}}>
        
                    <UserProfile user={this.props.user}/>

                    <div style={{ backgroundColor: 'red', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                 
                    <RecentSearches/>

                 </div>
                 
            </div>
       )
    }
 }

 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
     selectors.userSelector,
    (address, user) => ({
        address, user 
    })
 )


 export default connect(mapStateToProps)(Profile)