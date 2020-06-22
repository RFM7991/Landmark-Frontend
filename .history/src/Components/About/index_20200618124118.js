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
            <div style={{  width: '100%', height: '100vh',  display: 'flex', flexDirection: 'row', alignItems: 'space-between', backgroundColor: 'white'}}>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', color: 'black',  justifyContent: 'center', }}>
                    
                    <div style={{  height: '80%', display: 'flex', alignItems:'center', justifyContent: 'space-around', flexDirection: 'column'}}>
                        <div style={{   }}>
                            <h1>We're Here for Your Journey</h1>
                        </div>
                        <div style={{ fontSize: '16px', paddingLeft: '5em', paddingRight: '5em'}}>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Erat pellentesque adipiscing commodo elit at imperdiet. Etiam tempor orci eu lobortis elementum nibh tellus molestie nunc. Vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Suspendisse sed nisi lacus sed viverra tellus in hac habitasse. Quisque id diam vel quam elementum pulvinar etiam non quam. Risus ultricies tristique nulla aliquet enim tortor. Neque viverra justo nec ultrices. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed tempus urna et. Purus ut faucibus pulvinar elementum integer enim neque. At augue eget arcu dictum varius duis at. Tempor id eu nisl nunc mi ipsum faucibus vitae aliquet. Netus et malesuada fames ac turpis egestas integer eget. Ullamcorper morbi tincidunt ornare massa. A iaculis at erat pellentesque adipiscing commodo elit. Nec feugiat nisl pretium fusce. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus.  </p>
                        </div>
                    
                    </div>
                </div>

                <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'blue', color: 'black',  }}>
                    <div style={{ width: '70%', height: '90%', justifyContent: 'space-around', display: 'flex', flexDirection: 'column', backgroundColor: 'red'}}>
                        <SidePanel title={"Buyers"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur vitae nunc sed velit dignissim sodales ut eu. Elit scelerisque mauris pellentesque pulvinar. Consequat interdum varius sit amet mattis vulputate enim. Pellentesque habitant morbi tristique senectus et netus et. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Rhoncus urna neque viverra justo. Tortor at risus viverra adipiscing at in tellus. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. "}/>

                        <SidePanel title={"Brokers"} content={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur vitae nunc sed velit dignissim sodales ut eu. Elit scelerisque mauris pellentesque pulvinar. Consequat interdum varius sit amet mattis vulputate enim. Pellentesque habitant morbi tristique senectus et netus et. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Rhoncus urna neque viverra justo. Tortor at risus viverra adipiscing at in tellus. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. "}/>
                    </div>
                </div>
            </div>
       )
    }
 }

 const SidePanel = props => {

     return (
         <div style={{ display: 'flex', width: '100%', height: '45%', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'whitesmoke', borderRadius: '1em'}}>
             <h3>{props.title}</h3>
             <div>
                 <p style={{ fontSize: '14px'}}>{props.content}</p>
             </div>
             <div>
                 <p>Link</p>
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
