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
import UserProfile from './UserProfile'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ProfilePanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: ''
        }
    }

    async componentDidMount() {
    }

    handleSubmit = async () => {
    }

    handleChange = e => {
        this.setState({body: e.target.value})
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'red',
            display: 'columns', alignItems: 'flex-start', justifyContent: 'center'}}>
                  <img src={'https://media-exp1.licdn.com/dms/image/C4E03AQGIviyGnEnlyQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=RIDnoFwrm22DeH-yGzlaZvLewKS6MDXIza6YrWK5GOQ'} 
                    width={100} height={100} style={{borderRadius: 45}}/>
                    <div style={{ color: 'black'}}>
                        <p>name:  {this.props.user.first} {this.props.user.last}</p>
                        <p>username: {this.props.user.username}</p>
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


 export default connect(mapStateToProps)(ProfilePanel)