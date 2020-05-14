import React from 'react'
import '../css/App.css'
import NavigationBar from './NavigationBar'
import LookUpForm from './LookUpForm'
import DemographicsPanel from './DemographicsPanel'
import { connect } from 'react-redux'
import SimpleMap from './Map'
import PlacesList from './PlacesList'
import * as selectors from '../Reducers/selectors'
import { createSelector } from 'reselect';
import ChartsPanel from './ChartsPanel'
import { BrowserRouter as Router, Route, Link, Switch,  Redirect,  } from 'react-router-dom';
import Login from './Login'
import Register from './Login/Register'
import CommentsPanel from './CommentsPanel'
import { updateAddress } from '../Actions/address-actions';
import TransportationPanel from './TransportationPanel'
import Footer from './Footer'
import skylineBackground from '../images/modern-skyline.jpg'
import Joyride, { CallBackProps, STATUS, Step, StoreHelpers } from 'react-joyride';
import Button from 'react-bootstrap/Button';
import { updateUser } from '../Actions/user-actions';
import { setRecentSearches, getUserInfo } from '../Requests/users-requests' 
import Profile from './Profile'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class App extends React.Component { 

  constructor(props) {
    super(props) 
    this.onUpdateAddress = this.onUpdateAddress.bind(this)
    
    this.state = {
      searches : [],
     
      run: false,
    }
  }

  async componentDidMount() {
  //  localStorage.clear()
    let userInfo;
    let user = JSON.parse(localStorage.getItem('user'))
    console.log('USER FROM STORAGE', user)
    if (user == undefined ) { //user == undefined
       user = {_id: -1, username: 'guest', is_admin: false}
    } 
    else if (user._id != -1) {
      // get user from local storage
      userInfo = await getUserInfo(user._id)
      console.log('USER INFO', userInfo.res[0])
      if (userInfo.res[0].recentSearches.length > 0) {
        await this.setState({ searches : userInfo.res[0].searches})
        localStorage.setItem('recentSearches', JSON.stringify(userInfo.res[0].recentSearches))
      }
    }

    // update user in redux
    this.onUpdateUser(user)

    // check if local storage has changes and update server on interval
    setInterval(async () => {
      this.checkSearches()
    }, 10000);
    
  }

  checkSearches = async () => {
    // push recent searches
    if (this.props.user._id != -1) {
      let searches = localStorage.getItem('recentSearches')

      if (searches != null) {
        console.log('COMPARE', searches == this.state.searches)
        if (searches != this.state.searches) {
           this.setState({ searches : searches}) 
          
          searches = JSON.parse(searches)
          await setRecentSearches(this.props.user._id, searches).then(data => console.log('SET RECENTS', data))
        }
      } 
    }
  }

  onUpdateUser = (user) => {
    this.props.onUpdateUser(user)
  }

  onUpdateAddress = (address) => {
    this.props.onUpdateAddress(address)
  }
  runJoyRideTutorial = () => {
    this.setState({run: true})
  }

  handleJoyrideCallback = (data) => {
    const { status, type } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      this.setState({ run: false });
    }
  }

  getHelpers = (helpers) => {
    this.helpers = helpers;
  };

  render() {
    console.log("APP", this.props)

    if (this.props.ready) {
    
      var map = <div>
        <div className="results-container">
          <DemographicsPanel 
            business_type={this.props.business_type} 
            street = {this.props.address.street}
            city = {this.props.address.city}
            state = {this.props.address.state}
            zip = {this.props.address.zip}
            lat = {this.props.address.coords.lat}
            lng = {this.props.address.coords.lng}
            getHelpers={this.getHelpers}
            orientation = {"demographics-list-vertical "}>
          </DemographicsPanel>
          <SimpleMap runJoyRideTutorial={this.runJoyRideTutorial} height={'72.2vh'} address={this.props.address} center={this.props.address.coords} zoom={15} business_type={this.props.business_type}/>
          <PlacesList/>
          </div>
          <br></br>
          <ChartsPanel/>
          <TransportationPanel/>
          <CommentsPanel/>
        </div>
    }

    return (
      <div>
        <Switch>
          <Route
          path={'/:address/:business_type/:distance'}
          render={(({match}) => {
            return <div className="testTarget" style={{backgroundColor: darkBg}}>
              <NavigationBar/>
            
              <Joyride 
                steps={steps} 
                continuous={true}
                run={this.state.run}
                callback={this.handleJoyrideCallback}
                scrollToFirstStep={true}
                showProgress={true}
                showSkipButton={true}
                styles={{
                  options: {
                    zIndex: 10000,
                  },
                }}
             />
              {map}
              <div className="App" >
              <header className="App-header" style={{backgroundColor: darkBg}}>
              <LookUpForm urlParams={match.params}/>
              </header>
            </div>
            <Footer/>
          </div>
        })}>
        </Route>

        <Route
           path={'/login'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{
                  backgroundImage: `url(${skylineBackground})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%', 
                  opacity: '1',
                }}>
                  <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(26,28,41, 0)', zIndex: 1}}></div>

                    <Login/>
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>
        <Route
            path={'/register'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{
                  backgroundImage: `url(${skylineBackground})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%', 
                  opacity: '1',
                }}>
                  <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(26,28,41, 0)', zIndex: 1}}></div>

                    <Register/>
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>
        <Route
            path={'/profile'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{
                  backgroundImage: `url(${skylineBackground})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%', 
                  opacity: '1',
                }}>
                  <Profile />
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>

        <Route
          exact path={'/'}
          render={(({match}) => {
            return <div>
                <NavigationBar/>
                <div className="App">
                <header className="App-header" style={{
                  backgroundImage: `url(${skylineBackground})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%', 
                  opacity: '1',
                }}>
                  <div style={{position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(26,28,41, 0)', zIndex: 1}}></div>
                  <h1 style={{zIndex: 2, fontSize: '58px', fontWeight: 'bold', fontFamily: 'Tahoma, Geneva, sans-serif' }}>Landmark</h1>
                  <br></br>
                  <h3 style={{zIndex: 2}}>Commercial Real Estate Consultation for All</h3>
                    <LookUpForm/>
               
                </header>
              </div>
              <Footer/>
            </div>
          })}>
        </Route>
      </Switch>
      </div>
    );
  }
}

const steps =  [
  {
    target: 'body ',
    content: "Welcome to Landmark Map Interface, let's get started",
    placement: 'center'
  },
  {
    target: '.map_container ',
    content: <div>
        <h3 style={{fontSize: '24px'}}>Map</h3>
        <p style={{fontSize: '14px', textAlign: 'left'}}>The Map interface is your guide to the location and its surroundings</p>
        <p style={{fontSize: '14px', textAlign: 'left'}}>You can toggle between "Map" and "Satellite," zoom in and out, and drag the yellow "pegman"
        in the lower right corner on to the map to enter street view. </p>
       </div>,
    placement: 'center',
  },
  {
    target: '.map-control_bar ',
    content: <div>
         <h3 style={{fontSize: '24px'}}>Map Tools</h3>
    <p>Use this toolbar to customize your map view </p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>1. Center - automatically pans to your original position</p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>2. Street View - Toggles street view window</p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>3. Overlay - Toggle Zip code or Trade Zone overlay </p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>4. Businesses - Select which nearby businesses to mark on the map </p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>5. Places of Interest - Select which nearby Places of Interest to mark on the map </p>
    <p style={{fontSize: '14px', textAlign: 'left'}}>6. Results - Select between 20, 40, and 60 results for selected nearby businesses or places of interest  </p>
   </div>,
  },
  {
    target: '.demographics-list-vertical',
    placement: 'right-start',
    content: <div>
         <h3 style={{fontSize: '24px'}}>Demographics Panel</h3>
         <p style={{fontSize: '14px', textAlign: 'left'}}>1. Zip / Tradezone - Select which area to display statistics for and display on the map</p>
         <p style={{fontSize: '14px', textAlign: 'left'}}>2. statistics - Click through the different categories to see more specific demographics information for your location</p>
   </div>,
  }, 
  {
    target: '.places-list',
    placement: 'left-start',
    content: <div>
         <h3 style={{fontSize: '24px'}}>Nearby Businesses Panel</h3>
         <p style={{fontSize: '14px', textAlign: 'left'}}>Here is a list of nearby business and places of interest currently displayed on the map. Click an item to view it's details on the map </p>
   </div>,
  },
  {
    target: 'body ',
    content: <div>
    <h3 style={{fontSize: '24px'}}>Get Started</h3>
    <p style={{fontSize: '14px', textAlign: 'left'}}>Click the '?' again if you need help, Good Luck! </p>
</div>,
    placement: 'center'
  },

  //
]

const mapStateToProps = createSelector(
  selectors.addressSelector,
  selectors.businessTypeSelector,
  selectors.readySelector,
  selectors.isCitySelector,
  selectors.userSelector,
  (address, business_type, ready, isCity, user) => ({
      address,
      business_type,
      ready,
      isCity,
      user
  })
);

const mapActionsToProps = {
  onUpdateAddress: updateAddress,
  onUpdateUser: updateUser
}

export default connect(mapStateToProps, mapActionsToProps) (App);
