import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'
import { Link, withRouter } from 'react-router-dom'
import { getRecents } from '../../Requests/listings-requests'
import Table from 'react-bootstrap/Table'
import GridLoader from "../UI/GridLoader"
import MultiSlideshow from "./MultipleSlideShow"
import { GOOGLE_KEY, google } from "../../Constants"
import GoogleMapReact from 'google-map-react';
import { renderMarker, BLUE_MARKER } from "../GoogleMapComponents"
import Image from 'react-bootstrap/Image'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingPreviews extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            hovering : false
        }
    }

    async componentDidMount() {
     
    }

    

    navigateToListing = () => {
        this.props.history.push(this.getUrl())
    }

    getUrl = () => {
        let url = '/listing/' + this.props.listing.listingId
        return url
    }


    render() {
      
        return (
            
            <div className="d-block w-100" style={{backgroundColor : lightBg, height: this.props.height, paddingTop: '0.5em'}} > 
             
       
             <div style={{ height: '80%', width: '100%'}} onMouseOver={this.handleHover} > 
             {this.props.listing.photos != undefined &&  
                <Image 
                    onClick={this.navigateToListing}
                    className="listingCard"
                    src={S3_BASE + this.props.listing.photos.cover_photos[0]}
                    alt="First slide"
                    fluid
                    style={{  height: '90%'}}
                />
             }
            </div>  

            <div style={{ color: 'white', fontSize : '1px', backgroundColor: 'yellow', height: '40px'}}>
            {this.props.listing.photos != undefined &&  
                <Link style={{  textDecorationLine: 'underline', color: 'white', fontSize: '16px', fontWeight: 'bold'}}to={this.getUrl}>{this.props.listing.location.formatted}</Link>
            }
            </div>
             
         </div>
       )
    }
 }
 /**
  *   <Carousel.Item >
                         
                         <div className="d-block w-100" style={{backgroundColor : 'black', height : this.props.height}}> 
                        
                            <Image 
                            id="noBlur"
                            src={S3_BASE + e}
                            alt="First slide"
                            fluid
                            />
                         </div>
                        <Carousel.Caption>
                        </Carousel.Caption>
                    </Carousel.Item>
  */

 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
     selectors.userSelector,
    (address, user) => ({
        address, user 
    })
 )




 export default withRouter(connect(mapStateToProps)(ListingPreviews))
