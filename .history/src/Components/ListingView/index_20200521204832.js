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

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingView extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            index : 0,
            photos : { contact_photos : [], site_photos : []},
            contact_photos_key : -1,
            site_photos_key : -1

        }
    }

    async componentDidMount() {
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


    render() {

      
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               
                    <div style={(this.state.listingData == undefined) ? { width: '100%', height: '50vh'} : {display : 'none'}}> 
                        {this.state.listingData == undefined && 
                            <GridLoader color={"#0892d0"}/>
                        }     
                    </div>
                        
                        { this.state.listingData != undefined &&
                            <div style={{ display: 'flex', flexDirection: 'column',  width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
                                <div style={{  width: '100%',backgroundColor: 'white'}}>
                                    <h3 style={{ marginTop : '2%', marginBottom: '2%'}}>{this.state.listingData.location.formatted}</h3>
                                </div>

                                <div style={{ display : 'flex', backgroundColor: 'whitesmoke', justifyContent:'space-between' }}>
                                 <div style={{ height: '400px', width: '39.5%' }}>
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
           
                            <div style={{ width: '80%'}}>
                            {Object.entries(this.state.listingData).map(([key, value], i) => {
                                 if (key == '_id' || key == 'photos' || key == "listingId") return;
                                return (
                                    <Table striped bordered hover variant="dark" >
                                        <thead><tr>{key}</tr></thead>
                                    
                                        <tbody>
                                            {Object.entries(value).map(( [v_key, v_value]) => {
                                                if (key == '_id' || key == 'photos') return;
                                                if (v_key == 'coords' || v_key == 'place') return;

                                                return (
                                                        <tr>
                                                        <td>{v_key}</td>
                                                        <td>{v_value}</td>
                                                        </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                    )
                                })
                            }
                 
                        <Table striped bordered hover variant="dark" >
                            <thead><tr>Contact Photos</tr></thead>
                            <tbody>
                            <tr>
                                {this.state.listingData.photos.contact_photos.map((e, i) => {
                                    console.log(S3_BASE + e)
                                    return (
                                        <td>{<img src={S3_BASE + e} style={{width: '100px', height: '100px'}}/>}</td>
                                    )
                                })}
                            </tr>
                            </tbody>
                        </Table>

                        <Table striped bordered hover variant="dark" >
                            <thead><tr>Site Photos</tr></thead>
                            <tbody>
                            <tr>
                                {this.state.listingData.photos.site_photos.map((e, i) => {
                                    return (
                                        <td>{<img src={S3_BASE + e} style={{width: '200px', height: '200px'}}/>}</td>
                                    )
                                })}
                            </tr>
                            </tbody>
                        </Table>
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


 export default withRouter(connect(mapStateToProps)(ListingView))
