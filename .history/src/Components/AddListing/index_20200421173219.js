import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import ContactInfo from './ContactInfo'
import LocationDetails from './LocationDetails'
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            index : 0
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

    handleTabPress = index => {
        this.setState({ index : index })
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{backgroundImage: `url(${skylineBackground})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'center', 
                    width: '100%', height: 200,  
                    backgroundColor: 'whitesmoke'}}>
                
                    <h3 style={{ color: 'white'}}>New Listing</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'green', flexDirection: 'row',  width: '80%' }}>
                   
                    <Button className="tabItem" onClick={() => this.handleTabPress(0)}>
                      Contact Info
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(1)}>
                      Location Details
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(2)}>
                        Pricing and terms
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(3)}>
                        Submit
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
                    {this.state.index == 0 && <ContactInfo /> }
                    {this.state.index == 1 && <LocationDetails />  }
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


 export default connect(mapStateToProps)(AddListing)