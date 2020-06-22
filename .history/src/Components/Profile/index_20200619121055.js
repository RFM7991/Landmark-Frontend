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
            body: ''
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
            <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.9)', display: 'flex'}}>
                 <UserProfile user={this.props.user}/>
                 <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column'}}>
                     <div style={{ width: '100%', height: '10%', backgroundColor: 'red', display: 'flex'}}>
                        <Button />
                        <Button />
                     </div>

                     <div style={{ width: '100%', height: '90%'}}>
                        <RecentSearches/>
                     </div>
                    
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