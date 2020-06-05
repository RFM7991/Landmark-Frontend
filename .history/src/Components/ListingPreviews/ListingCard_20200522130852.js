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

    handleHover = () => {
        this.setState({ hovering : true })
    }

    handleMouseOut = () => {
        this.setState({ hovering : false })
    }


    getUrl = () => {
        let address = encodeURI(JSON.stringify(this.state.listingData.location.formatted))
        let business_type = "restaurant"
        let url = '/' + address + '/' + business_type
        return url
    }


    render() {
        console.log("PROPS", this.props)
      
        return (
            
            <div className="d-block w-100" style={{backgroundColor : lightBg, height: this.props.height}} > 
             <div style={{ height: '85%', width: '100%'}} onMouseOver={this.handleHover} >        
                <Image 
                className="listingCard"
                id="noBlur"
                src={S3_BASE + this.props.listing.photos.site_photos[0]}
                alt="First slide"
                fluid
                style={{  height: '90%'}}
                />
            </div>   
            <div style={{ color: 'white', fontSize : '14px'}}>
                <p>{this.props.listing.location.formatted}</p>
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
