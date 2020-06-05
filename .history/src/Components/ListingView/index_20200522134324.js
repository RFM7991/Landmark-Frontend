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
            <div style={{ width: '100%', height: '100%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               
                    <div style={(this.state.listingData == undefined) ? { width: '100%', height: '100vh', display: 'flex', alignItems:'center', justifyContent: 'center'} : {display : 'none'}}> 
                        {this.state.listingData == undefined && 
                            <GridLoader color={"#0892d0"}/>
                        }     
                    </div>
                        
                        { this.state.listingData != undefined &&
                            <div style={{ display: 'flex', flexDirection: 'column',  width: '100%', height: '100%', backgroundColor: 'white', }}>
                                <div id="listingHeader"style={{paddingTop: '1em', paddingBottom: '0.5em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', backgroundColor: 'white'}}>
                                    <Link to={this.getUrl} style={{ flex: 1,  fontSize: '22px', color: "blue", fontWeight: 'bold',  stroke: 'black', strokeWidth: 2, fontFamily: 'Tahoma, Geneva, sans-serif'}}>
                                         ...Go to Map View
                                    </Link>
                                    
                                    <h3 style={{ flex: 3}}>{this.state.listingData.location.formatted}</h3>
                                    
                                    <div style={{ display: 'flex', flex: 1}}/>
                                </div>
                            
                                <div style={{ display : 'flex', backgroundColor: 'whitesmoke', justifyContent:'space-between' }}>
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
                                  <Slideshow width={'60%'} height={'400px'} photos={this.state.listingData.photos.site_photos}/>
                                </div>
                            
                            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                                <div style={{ width: '65%', margin: '2.5%'}}>

                                <h3 className="listingTableHeader">Listing Summary</h3>
                                <Table  className="listingDataTable" bordered hover variant="light">
                                    <tbody>
                                        <tr>
                                        <td>Address</td>
                                        <td className="tableValue">{data.location.formatted}</td>
                                        </tr>
                                        <tr>
                                        <td>Asking price</td>
                                        <td className="tableValue">${data.pricingInfo.askingPrice}</td>
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
                                
                                <h3 className="listingTableHeader">Location Details</h3>
                                <Table  className="listingDataTable" bordered hover variant="light" >
                                        <tbody>
                                            {Object.entries(data.locationDetails).map(([key, value], i) => {
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

                                <h3 className="listingTableHeader">Pricing Info</h3>
                                <Table  className="listingDataTable" bordered hover variant="light" >
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
                                <h3 style={{ marginTop: '0.5em', marginBottom: '0.5em'}}>Contact Information</h3>
                                
                                <div style={{ width: '60%', height: '20%',  marginBottom: '0.5em'}}>
                                    <Image src={S3_BASE+ data.photos.contact_photos[0]} fluid roundedCircle/>
                                </div>
                                <p style={{ marginTop: '0.5em', marginBottom: '0.5em', fontWeight: 'bold'}}>{capitalizeFirst(data.contactInfo.relationship)}</p>
                                <div style={{ padding: '0.5em'}}>
                                    <p>{data.contactInfo.ownershipDetails}</p>
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
