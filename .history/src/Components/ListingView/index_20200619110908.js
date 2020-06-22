import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'
import { Link, withRouter } from 'react-router-dom'
import { getListingById } from '../../Requests/listings-requests'
import Table from 'react-bootstrap/Table'
import GridLoader from "../UI/GridLoader"
import Slideshow from "../UI/Slideshow"
import { GOOGLE_KEY, google } from "../../Constants"
import GoogleMapReact from 'google-map-react';
import { renderMarker, BLUE_MARKER } from "../GoogleMapComponents"
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingView extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {

        }
    }

    async componentDidMount() {

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        // get listing info from url params
        if (this.props.urlParams) {

            if (this.props.urlParams.listingId != undefined) {
                let res = await getListingById(this.props.urlParams.listingId)

                if (res.length > 0) {
                    this.setState({ listingData : res[0]})
                }
                
            }

        }

        

    }

    setLocation = (location) => {
        this.setState({ location : location })
        this.addFormInfo(location, 'location')
        this.handleNext()
    }


    handleChange = e => {
        this.setState({body: e.target.value})
    }

    handleTabPress = index => {
        this.setState({ index : index })
    }

    addFormInfo = (data, category )=> {
        this.setState({ formData : {...this.state.formData, [category] : data }})
    }

    handleNext = () => {
        this.setState({ index : this.state.index+1})
        window.scrollTo(0, 0)
    }

    handleSetPhotos = (category, photos) => {
        let photosState = this.state.photos
        let removals = []

        for (let i=0; i < photosState[category].length; i++) {
            for (let j=0; j < photos.length; j++) {
                 if (photosState[category][i].name == photos[j].name) {
                    removals.push(j)
                    break;
                }
            }
            
        }

        for (let i=0; i < removals.length; i++) {
            photos.splice(removals[i], 1)
        }


        photosState[category] =  photosState[category].concat(photos)

        this.setState({ photos : photosState})
    }

    removePhoto = (category, index) => {
        let photosState = this.state.photos
        photosState[category].splice(index, 1)

        this.setState({ photos : photosState, [category + '_key'] : this.state[category + '_key'] *-1 })
    }

    apiIsLoaded = (map, maps, center) => {
        this.state.map = map
        renderMarker('your_business', center, map, 'Your Business', BLUE_MARKER)
    }

    getMapOptions = (maps) => {

        return {
            streetViewControl: false,
            scaleControl: true,
            fullscreenControl: false,
            styles: [{
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{
                    visibility: "off"
                }]
            }],
            gestureHandling: "greedy",
            disableDoubleClickZoom: true,
            minZoom: 11,
            maxZoom: 18,
    
            mapTypeControl: true,
            mapTypeId: maps.MapTypeId.ROADMAP,
            mapTypeControlOptions: {
                style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: maps.ControlPosition.BOTTOM_CENTER,
                mapTypeIds: [
                    maps.MapTypeId.ROADMAP,
                    maps.MapTypeId.SATELLITE,
                    maps.MapTypeId.HYBRID
                ]
            },
    
            zoomControl: true,
            clickableIcons: false
        };
    }

    getUrl = () => {
        let address = encodeURI(JSON.stringify(this.state.listingData.location.formatted))
        let business_type = "restaurant"
        let url = '/' + address + '/' + business_type
        return url
    }

    render() {
        let data = this.state.listingData
      
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: lightBg, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               
                    <div style={(this.state.listingData == undefined) ? { width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center'} : {display : 'none'}}> 
                        {this.state.listingData == undefined && 
                            <GridLoader color={"#0892d0"}/>
                        }     
                    </div>
                        
                        { this.state.listingData != undefined &&
                            <div style={{ display: 'flex', flexDirection: 'column',  width: '100%', height: '100%', backgroundColor: lightBg, }}>
                                <div id="listingHeader"style={{paddingTop: '1em', paddingBottom: '0.5em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: lightBg}}>
                                    <div style={{ flex: 1}}>
                                        <Link style={{  color: 'black', fontSize: '18px', fontWeight: 'bold'}}to={this.getUrl}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'}}>
                                                <FontAwesomeIcon icon={faMapMarkedAlt} size="3x" color="rgb(1,100,182" style={{ marginBottom: '0.25em'}}/>
                                             
                                                Go to map view
                                            </div>
                                        </Link>
                                    </div>
                                    <h2 style={{ flex: 5, color: 'white', textDecorationLine: 'underline',}}>{this.state.listingData.location.formatted}</h2>
                                    
                                    <div style={{ display: 'flex', flex: 1}}/>
                                </div>
                            
                                <div style={{ display : 'flex', backgroundColor: 'whitesmoke', justifyContent:'space-between', paddingBottom: '0.25em', paddingTop: '0.25em' }}>
                                 <div style={{ height: '400px', width: '39.25%' }}>
                              
                                        <GoogleMapReact
                                        bootstrapURLKeys={{ key: GOOGLE_KEY }}
                                        defaultCenter={this.state.listingData.location.coords}
                                        defaultZoom={17}
                                        yesIWantToUseGoogleMapApiInternals={true}
                                        layerTypes={['TrafficLayer', 'TransitLayer']}
                                        id={'map_list_view'}
                                        onGoogleApiLoaded={({ map, maps }) => this.apiIsLoaded(map, maps, this.state.listingData.location.coords)}
                                        options = {this.getMapOptions}
                                        >
                                      
                                        </GoogleMapReact>
                                    </div>
                                  <Slideshow width={'60%'} height={'400px'} photos={this.state.listingData.photos.cover_photos.concat(this.state.listingData.photos.site_photos)}/>
                                </div>
                            
                            <div id="listingViewBottom "style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                <div style={{ width: '65%', margin: '2.5%'}}>

                                <h3 className="listingTableHeader" style={{ color: 'white'}}>Listing Summary</h3>
                                <Table  className="listingDataTable" striped bordered hover variant="light">
                                    <tbody>
                                        <tr>
                                        <td>Address</td>
                                        <td className="tableValue">{data.location.formatted}</td>
                                        </tr>
                                        <tr>
                                        <td>Asking price</td>
                                        <td className="tableValue">{(data.pricingInfo.askingPrice != undefined) ? `$ ${data.pricingInfo.askingPrice}` : "Unavailable"}</td>
                                        </tr>
                                        <tr>
                                        <td>For Sale?</td>
                                        <td className="tableValue">{capitalizeFirst(data.contactInfo.forSale)}</td>
                                        </tr>
                                        <tr>
                                        <td>For Lease?</td>
                                        <td className="tableValue" >{capitalizeFirst(data.contactInfo.forLease)}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                
                                <h3 className="listingTableHeader" style={{ color: 'white'}}>Location Details</h3>
                                {Object.entries(data.locationDetails).length == 0 && <p style={{ color: 'white', textAlign: 'left'}}>This information is unavailable or has not been provided yet</p>}
                                <Table  className="listingDataTable" striped bordered hover variant="light" >
                                        <tbody>
                                            {Object.entries(data.locationDetails).map(([key, value], i) => {

                                                // C/O
                                                if (key == "hasOccupancyCert") {
                                                    return (
                                                        <tr>
                                                            <td>{"Has CO"}</td>
                                                            <td className="tableValue">{capitalizeFirst(value)}</td>
                                                        </tr>
                                                    )
                                                }

                                                // ingress
                                                if (key == "ingressInfo") {
                                                    return (
                                                        <tr>
                                                            <td>{"Means of Ingress/Egress"}</td>
                                                            <td className="tableValue">{capitalizeFirst(value)}</td>
                                                        </tr>
                                                    )
                                                }

                                                return (
                                                    <tr>
                                                        <td>{formatKeys(key)}</td>
                                                        <td className="tableValue">{capitalizeFirst(value)}</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                </Table>

                                <h3 className="listingTableHeader" style={{ color: 'white'}}>Pricing Info</h3>
                                {Object.entries(data.pricingInfo).length == 0 && <p style={{ color: 'white', textAlign: 'left'}}>This information is unavailable or has not been provided yet</p>}
                                <Table  className="listingDataTable" striped bordered hover variant="light" >
                                        <tbody>
                                            {Object.entries(data.pricingInfo).map(([key, value], i) => {
                                                return (
                                                    <tr>
                                                        <td>{formatKeys(key)}</td>
                                                        <td className="tableValue">{(key.indexOf('Price') > -1 || key.indexOf('Cost') > -1) ? '$' + capitalizeFirst(value) : capitalizeFirst(value)}</td>
                                                    </tr>
                                                )
                                            })
                                            }
                                        </tbody>
                                </Table>

                            </div>

                            <div id="contact_info_panel" style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', alignItems:'center' }}>
                                <h3 style={{ marginTop: '0.5em', marginBottom: '0.5em', color: 'white'}}>Contact Information</h3>
                                
                                <div style={{ width: '60%', marginBottom: '0.5em'}}>
                                    {data.photos.contact_photos.length > 0 &&  <Image src={S3_BASE+ data.photos.contact_photos[0]}  roundedCircle style={{ maxHeight: "200px"}}/> }
                                </div>
                                <p style={{ marginTop: '0.5em', marginBottom: '0.5em', fontWeight: 'bold', color: 'white'}}>
                                { (data.contactInfo.relationship != 'other') ? capitalizeFirst(data.contactInfo.relationship) : 'Other (non broker/landlord)' }
                                </p>
                                <div style={{ padding: '0.5em'}}>
                                    <p style={{ color: 'white'}}>{data.contactInfo.ownershipDetails}</p>
                                </div>
                            </div>
                        </div>
                    </div>
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

 const capitalizeFirst = value => {
    return value.substring(0,1).toUpperCase() + value.substring(1, value.length)
 }

 const formatKeys = value => {
    let formatted = ""
    for (let i=0; i < value.length; i++) {
        let char = value.substring(i, i+1)
        if (i == 0) {
            formatted += char.toUpperCase()
            continue;
        }
        
        if (char == char.toUpperCase()) {
            formatted += " " + char
            continue;
        }

        formatted += char;
    }
    return formatted;
 }


 export default withRouter(connect(mapStateToProps)(ListingView))
