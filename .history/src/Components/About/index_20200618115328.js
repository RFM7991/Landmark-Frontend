import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AboutSection extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            listings : [],
            startIndex: 0,
            limit : 20
        }
    }

    async componentDidMount() {


    }

    render() {
      
        return (
            <div style={{  width: '100%', height: '80%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
           
                   
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

 export default withRouter(connect(mapStateToProps)(AboutSection))
