import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import ContactInfo from './ContactInfo'
import LocationDetails from './LocationDetails'
import Button from 'react-bootstrap/Button';
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

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
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', 
            display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', height: 200,  backgroundColor: 'blue'}}>
                        <h3 style={{ color: 'white'}}>Listing Details</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'green', flexDirection: 'row',  width: '80%' }}>
                    <div className="tabItem" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <p style={{ backgroundColor: 'red'}}>Contact Info</p>
                    </div>
                    <Button className="tabItem">
                      Location Details
                    </Button>
                    <div className="tabItem">
                        <p>Pricing and terms</p>
                    </div>
                    <div className="tabItem">
                        <p>Submit</p>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
                    <ContactInfo />
                    <LocationDetails /> 
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