import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'
import { getListings } from "../../Requests/listings-requests"
import Image from "react-bootstrap/Image"

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingItem extends React.Component {

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

    getUrl = (listingId) => {
        let url = '/listing/' + listingId
        return url
    }

    navigateToListing = () => {
        this.props.history.push(this.getUrl())
    }

    render() {
      
        return (
            <div className="listingItem" style={{ backgroundColor: lightBg, padding: '1em',  width: '100%', height: '20%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                <div style={{ width: '33%', height: '80%'}}>
                    <Image 
                        onClick={this.navigateToListing}
                        className="listingCard"
                        src={S3_BASE + this.props.listing.photos.site_photos[0]}
                        fluid
                    />
                </div>

                <div style={{ height: '100%', width: '66%'}}>
                    <h3>{this.props.listing.location.formatted}</h3>
                    <p>${this.props.listing.pricingInfo.askingPrice}</p>
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

 export default withRouter(connect(mapStateToProps)(ListingItem))
