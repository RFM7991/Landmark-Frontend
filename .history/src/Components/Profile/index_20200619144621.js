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
import MyListings from './MyListings'
import UserProfile from './UserProfile'
import { getListingByUserId } from '../../Requests/listings-requests'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class Profile extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            index : 0,
            listings: [],
            loadingListings : true
        }
    }

    async componentDidMount() {
        let searches = localStorage.getItem('recentSearches')
        if (searches != null) {
            this.setState({ searches : JSON.parse(searches)})
        }

        let user_id = this.props.user._id
        //check if userid set in props, if not look in local storage
        if (user_id == undefined) {
            console.log("CHECK", localStorage.getItem('user'))
            let user = localStorage.getItem('user')

            if (user != undefined) {
                user_id = JSON.parse(user)._id
            }

            else return;
            
            
        }

        let res = await getListingByUserId(user_id)

        this.setState({ listings : res, loadingListings : false })
        console.log("MY_LISTINGS", res, user_id)
    }

    handleSubmit = async () => {
    }

    handleChange = e => {
        this.setState({body: e.target.value})
    }

    componentDidUpdate(prevProps) {

    }

    handleDeleteListing = async (id) => {

        console.log("BEFORE", this.state.listings, id)
        let listings = this.state.listings.filter((listing) => {
            return listing.listingId != id
        })

        await this.setState({ listings : listings })

        console.log("AFTER", this.state.listings)
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
                     <div style={{ width: '100%', height: '40px', backgroundColor: 'red', display: 'flex'}}>
                        <Button style={{ borderRadius: 0, flex: 1, fontSize: '18px', borderRight: '0.25px solid white', fontWeight: (this.state.index == 0) ? 'bold' : 'normal'}} 
                        variant={(this.state.index == 0) ? "primary" : "secondary"} onClick={() => this.setState({ index : 0})}>Recent Searches</Button>

                        <Button style={{ borderRadius: 0, flex: 1, borderLeft: '0.25px solid white', fontWeight: (this.state.index == 1) ? 'bold' : 'normal'}}
                         variant={(this.state.index == 1) ? "primary" : "secondary"} onClick={() => this.setState({ index : 1})}>My Listings</Button>
                     </div>

                     <div style={{ width: '100%', height: 'calc(100% - 40px)'}}>
                        {this.state.index == 0 && <RecentSearches/>}
                        {this.state.index == 1 && <MyListings listings={this.state.listings} loading={this.state.loadingListings} handleDeleteListing={this.handleDeleteListing}/>}
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