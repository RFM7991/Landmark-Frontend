import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'
import { getListings } from "../../Requests/listings-requests"
import ListingItem from "./ListingItem"

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingPreviews extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            listings : [],
            startIndex: 0,
            limit : 20
        }
    }

    async componentDidMount() {

        let data = await getListings(this.state.startIndex, this.state.limit)
        console.log("GET", data)
        this.setState({ listings : data })

        let geoAvailable = false;

        if ("geolocation" in navigator) {
            geoAvailable = true 
            console.log("Available");
          } else {
            geoAvailable = false
            console.log("Not Available");
          }

        if (geoAvailable) {
            console.log("TRY")
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position)
              });
        }
    }

    render() {
      
        return (
            <div style={{  width: '100%', height: '80%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div id="previewHeader" style={{ width: '100%', backgroundColor: darkBg, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h3  style={{ color: 'white', textAlign: 'left', paddingTop: '0.5em', paddingLeft: '0.5em'}}>Recent Listings</h3>
                </div>
              {
                  this.state.listings.map((listing, i) =>  {
                      return (
                        <ListingItem listing={listing} index={i}/>
                      )
                  })
              }
                   
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

 export default withRouter(connect(mapStateToProps)(ListingPreviews))
