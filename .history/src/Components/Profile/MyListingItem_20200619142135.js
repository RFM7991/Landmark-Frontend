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
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

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
            <div className="listingItem" style={{ backgroundColor: lightBg, padding: '1em',  width: '100%', height: '175px',  display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                <div style={{ width: '120px', height: '100px', backgroundColor : 'rgba(1,1,1,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Image 
                        onClick={this.navigateToListing}
                        className="listingCard"
                        src={S3_BASE + this.props.listing.photos.cover_photos[0]}
                        style={{ width: '100%', height: '100%'}}
                        fluid
                    />
                </div>

                <div style={{ height: '100%', width: '66%', color: 'white',  alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                <Link style={{   textDecorationLine: 'underline', color: 'white', fontSize: '18px', fontWeight: 'bold'}}to={this.getUrl}>
                <span style={{ fontSize: '16px', padding: '0 1em 0 1em'}}>{this.props.listing.location.formatted}</span></Link>
                    <br></br>
                    <br></br>
                    {(this.props.listing.pricingInfo.askingPrice != undefined) && <p style={{ fontWeight: 'bold' }}>${this.props.listing.pricingInfo.askingPrice}</p>}
                 
                </div>
                <div style={{ height: '100%',  display: 'flex', alignItems: 'center'}}>
                    <Button variant="danger">
                        Remove
                    </Button>
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

 const MyVerticallyCenteredModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Location Search 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3 style={{fontSize: '20px'}}>
            Start typing a street address* or the name of a business and select from the autofill results.
          </h3>
          <p>
              <ul>
                  <li><span><strong>*Current locations support New Jersey, the 5 boroughs of New York City, and Long Island, New York USA</strong> </span> </li>
                  <li><span> For intersections type the first street then '&amp;' or 'and' then the next street.</span><br></br> <span>
            For example, '3rd Ave &amp; 11th St, New York, NY'
            </span>   </li>
              </ul>
                  
            
          </p>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  

 export default withRouter(connect(mapStateToProps)(ListingItem))
