import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'
import { getListings } from "../../Requests/listings-requests"
import Image from "react-bootstrap/Image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

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

    getUrl = () => {
        let url = '/listing/' + this.props.listing.listingId
        return url
    }

    getMapUrl = () => {
        let address = encodeURI(JSON.stringify(this.props.listing.location.formatted))
        let business_type = "restaurant"
        let url = '/' + address + '/' + business_type
        return url
    }

    navigateToListing = () => {
        this.props.history.push(this.getUrl())
    }

    render() {
      
        return (
            <div className="listingItem" style={{ backgroundColor: lightBg, padding: '1em',  width: '100%', height: '20%',  display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                <div style={{ width: '100px', height: '100px', backgroundColor : 'rgba(1,1,1,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        onClick={this.navigateToListing}
                        className="listingCard"
                        src={S3_BASE + this.props.listing.photos.cover_photos[0]}
                        style={{ width: '100%', height: '100%'}}
                        fluid
                    />
                </div>

                <div style={{ height: '100%', width: '66%', color: 'white'}}>
                <Link style={{   textDecorationLine: 'underline', color: 'white', fontSize: '18px', fontWeight: 'bold'}}to={this.getUrl}>
                <span style={{ fontSize: '24px'}}>{this.props.listing.location.formatted}</span></Link>
                    <br></br>
                    <br></br>
                    {(this.props.listing.pricingInfo.askingPrice != undefined) && <p style={{ fontWeight: 'bold' }}>${this.props.listing.pricingInfo.askingPrice}</p>}
                 
                </div>
                <div style={{ height: '100%', width: '20%'}}>
                    <Link style={{  color: 'white', fontSize: '18px', fontWeight: 'bold'}}to={this.getMapUrl}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" color="rgb(1,100,182"/>
                            <br></br>
                            Go to map view
                        </div>
                    </Link>
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
