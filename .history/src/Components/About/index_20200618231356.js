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
import hipsters from '../../images/backgrounds/hipsters.jpg'
import woman from '../../images/backgrounds/woman.jpg'
import '../../css/App.css'
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
            <div style={{   width: '100%', height: '150vh',  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.55)' }}>
           
                    <div style={{ display: 'flex', flex: 1, width: '75%', flexDirection: 'column', color: 'white',  justifyContent: 'center', }}> 
                        <h1 style={{  fontWeight: 'bold', fontSize: '52px', marginBottom: '1em' }}>We're Here for Your Journey</h1>
                        <div style={{ fontSize: '16px', paddingLeft: '5em', paddingRight: '5em', }}>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet.  </p>
                        </div>
                    </div>

                   
                      <div style={{ backgroundColor: 'whitesmoke', flex: 1, display: 'flex', flexDirection: 'row'}}>
                      <header  style={{
                            flex: 1,
                            backgroundImage: `url(${woman})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100%', 
                            opacity: '1',
                            }}>
                                 <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', flexDirection: 'column', color: 'white',  justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.5)'}}> 
                                  <h3 style={{  fontWeight: 'bold', fontSize: '42px', textAlign: 'left', marginLeft: '1em',  }}>Small Businesses</h3>
                                    <div style={{ fontSize: '16px', marginLeft: '2em', paddingRight: '5em', marginBottom: '5em' }}>
                                        <p style={{ textAlign: 'left', marginTop: '2em', width: '60%'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscingelit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet.  </p>
                                    </div>
                            </div>
                        </header>
                        
                        <header  style={{
                            flex: 1,
                            backgroundImage: `url(${hipsters})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: '100%', 
                            opacity: '1',
                            }}>
                                 <div style={{ display: 'flex', flex: 1, width: '100%', height: '100%', flexDirection: 'column', color: 'white',  justifyContent: 'center', backgroundColor: 'rgba(1,1,1,0.3)' }}> 
                                    <h3 style={{  fontWeight: 'bold', fontSize: '42px', textAlign: 'left', marginLeft: '1.5em' }}>Brokers</h3>
                                    <div style={{ fontSize: '16px', paddingLeft: '5em', paddingRight: '5em', }}>
                                        <p style={{ textAlign: 'left', marginTop: '2em', width: '60%'}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet.  </p>
                                    </div>
                            </div>
                        </header>

                        
                        </div>
                 

                    <div style={{flex: 1, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: lightBg }}>
                        <div style={{ width: '100%', height: '75%', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center',  color: 'black' }}>
                            <InfoPanel title="Universal" subtitle="Explore any location* not just listings. *See info above for current available locations" icon={faGlobe}/> 
                            <InfoPanel title="Custom" subtitle="Utilize custom generated Retail Trade Zones" icon={faCog}/>
                            <InfoPanel title="Collaborative" subtitle="Get the community's opionion on any location" icon={faUsers}/>
                        </div>
                    </div>
            </div>
       )
    }
 }

 const SidePanel = props => {

     return (
         <div style={{ margin: '1em', display: 'flex', width: '300px', height: '200px', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',  borderRadius: '1em'}}>
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
        <div style={{ display: 'flex', width: '25%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
            <div style={{ width: '100%', flex: 3, display: 'flex',  flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center',  borderRadius: '1em'}}>
                <div style={{ flex: 2,  display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <h3 style={{ fontWeight: 'bold', marginBottom : '0.5em'}}>{props.title}</h3>
                </div>
                <div style={{ flex: 3, paddingTop: '1em', paddingBottom: '1em',  display: 'flex', alignItems: 'center', justifyContent: 'center',  paddingLeft: '2em', paddingRight: '2em', border: '1px solid rgb(1,100,182)', borderRadius: '50%' }}>
                    <FontAwesomeIcon icon={props.icon} size="3x" color="rgb(1,100,182)"/>
                </div>
                <div style={{ display: 'flex', flex: 1, fontSize: '16px', marginTop: '1em'}}>
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
