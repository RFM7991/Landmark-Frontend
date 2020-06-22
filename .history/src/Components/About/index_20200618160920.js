import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe} from '@fortawesome/free-solid-svg-icons'
import { faCog} from '@fortawesome/free-solid-svg-icons'
import { faUsers} from '@fortawesome/free-solid-svg-icons'

// <i class="fas fa-globe"></i>

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
            <div style={{   width: '100%', height: '100vh',  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.7)' }}>
           
                    <div style={{ display: 'flex', flex: 1, width: '75%', flexDirection: 'column', color: 'white',  justifyContent: 'center', }}> 
                        <h1 style={{  fontWeight: 'bold', fontSize: '52px' }}>We're Here for Your Journey</h1>
                        <div style={{ fontSize: '16px', paddingLeft: '5em', paddingRight: '5em', }}>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet.  </p>
                        </div>
                    </div>

                    <div style={{flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: lightBg }}>
                        <div style={{ width: '100%', height: '75%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center',  color: 'black' }}>
                            <InfoPanel title="Universal" subtitle="Explore any location* not just listings" icon={faGlobe}/> 
                            <InfoPanel title="Custom" subtitle="Utilize custom generated Retail Trade Zone" icon={faCog}/>
                            <InfoPanel title="Collaborative" subtitle="Get the community's opionion on any location" icon={faUsers}/>
                        </div>
                    </div>
            </div>
       )
    }
 }

 const SidePanel = props => {

     return (
         <div style={{ margin: '1em', display: 'flex', width: '300px', height: '200px', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'whitesmoke', borderRadius: '1em'}}>
             <div style={{ flex: 3,  display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <h3>{props.title}</h3>
             </div>
             <div style={{ flex: 4,  display: 'flex', alignItems: 'center', justifyContent: 'center',  paddingLeft: '2em', paddingRight: '2em' }}>
                 <p style={{ fontSize: '14px'}}>{props.content}</p>
             </div>
         </div>
     )
 }

 const InfoPanel = props => {

    return (
        <div style={{ display: 'flex', width: '250px', height: '250px', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
            <div style={{ width: '100%', flex: 3, display: 'flex',  flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'whitesmoke', borderRadius: '1em'}}>
                <div style={{ flex: 2,  display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <h3>{props.title}</h3>
                </div>
                <div style={{ flex: 3,  display: 'flex', alignItems: 'center', justifyContent: 'center',  paddingLeft: '2em', paddingRight: '2em' }}>
                    <FontAwesomeIcon icon={props.icon} size="3x" color="rgb(1,100,182"/>
                </div>
                <div style={{ display: 'flex', flex: 1, fontSize: '14px'}}>
                <p style={{ paddingLeft: '1em', paddingRight: '1em'}}>{props.subtitle}</p>
            </div>
            </div>
           
        </div>
    )
}
 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
     selectors.userSelector,
    (address, user) => ({
        address, user 
    })
 )

 export default withRouter(connect(mapStateToProps)(AboutSection))
