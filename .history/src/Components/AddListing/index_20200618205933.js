import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import ContactInfo from './ContactInfo'
import LocationDetails from './LocationDetails'
import PricingInfo from './PricingInfo'
import SelectLocation from './SelectLocation'
import Submit from './submit'
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'
import { join } from 'path';

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: '',
            index : 4,
            formData :  { contactInfo : {}, locationDetails: {}, pricingInfo : {} },
        //    {"_id":{"$oid":"5eb5a860c1a797ac66c79d31"},"location":{"formatted":"Ippudo NY, 4th Avenue, New York, NY, USA","street":"65 4th Ave","city":"New York","state":"NY","zip":"10003","coords":{"lat":40.730948,"lng":-73.990287},"place":{"access_points":[],"address_components":[{"long_name":"65","short_name":"65","types":["street_number"]},{"long_name":"4th Avenue","short_name":"4th Ave","types":["route"]},{"long_name":"Manhattan","short_name":"Manhattan","types":["political","sublocality","sublocality_level_1"]},{"long_name":"New York","short_name":"New York","types":["locality","political"]},{"long_name":"New York County","short_name":"New York County","types":["administrative_area_level_2","political"]},{"long_name":"New York","short_name":"NY","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"10003","short_name":"10003","types":["postal_code"]}],"formatted_address":"65 4th Ave, New York, NY 10003, USA","geometry":{"location":{"lat":40.730948,"lng":-73.990287},"location_type":"ROOFTOP","viewport":{"south":40.7295990197085,"west":-73.9916359802915,"north":40.7322969802915,"east":-73.98893801970848}},"place_id":"ChIJWUOc55tZwokR9q_g5l051rk","plus_code":{"compound_code":"P2J5+9V New York, United States","global_code":"87G8P2J5+9V"},"types":["establishment","food","point_of_interest","restaurant"]}},"contactInfo":{"forSale":"yes","forLease":"no","relationship":"broker","ownershipDetails":"Shane Inman discusses his commitment to excellence in customer service as well as his depth of experience in the real estate industry. Inman’s occupational pride is evident, as is his devotion to the company’s design expertise. Call (973) xxx-xxxx for details"},"locationDetails":{"sizeDetails":"12334","dimensionDetails":"123434","position":"in-line","tenantMixDetails":"aSas","parkingSpaceDetails":"12233","designatedParkingDetails":"yes","underConstruction":"no","ingressInfo":"asdasd","hasOccupancyCert":"yes","hasZoning":"yes"},"pricingInfo":{"askingPrice":"1234","leasePricePerSquareFoot":"1233","leaseTermDetails":"2 years","maintainenceCostPerSquareFoot":"123","insuranceCostPerSquareFoot":"1222","isAssignment":"no","isSublet":"no"},"listingId":280085022,"photos":{"contact_photos":["listings/280085022/contact_photos/upload1.png"],"site_photos":["listings/280085022/site_photos/upload1.jpg","listings/280085022/site_photos/upload2.jpg","listings/280085022/site_photos/upload3.jpg"],"cover_photos":["listings/280085022/site_photos/upload3.jpg"]}},

            photos : { cover_photos : [], contact_photos : [], site_photos : []},
            contactInfoIncomplete : true,
            locationDetailsIncomplete : true,
            pricingInfoIncomplete : true,
            photo_update_key : -1 // needed for [][] to descend to children 
            

        }
    }

    async componentDidMount() {
        let searches = localStorage.getItem('recentSearches')
        if (searches != null) {
            this.setState({ searches : JSON.parse(searches)})
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

    addFormInfo = async (data, category )=> {
        await this.setState({ formData : {...this.state.formData, [category] : data }})
        
        this.setState({ contactInfoIncomplete : this.state.formData.contactInfo.forSale == undefined || this.state.formData.contactInfo.forLease == undefined || this.state.formData.contactInfo.relationship == undefined })
    }

    handleNext = () => {
        this.setState({ index : this.state.index+1})
        window.scrollTo(0, 0)
    }

    handleSetPhotos = async (category, photos) => {
        let photosState = this.state.photos
        let removals = []

        console.log("MASTER_PHOTOS_1", this.state.photos)

        for (let i=0; i < photosState[category].length; i++) {
            for (let j=0; j < photos.length; j++) {
                console.log(i, j, photosState[category][i].name == photos[j].name, photosState[category][i].name, photos[j].name)
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
       
        await this.setState({ photos : photosState, photo_update_key : -1*this.state.photo_update_key, locationDetailsIncomplete : photosState.cover_photos.length == 0 })
        console.log("MASTER_PHOTOS_2", this.state.photos)
    }

    removePhoto = (category, index) => {
        let photosState = this.state.photos
        photosState[category].splice(index, 1)
        console.log("REMOVE_PHOTOS", photosState)

        this.setState({ photos : photosState, photo_update_key : this.state.photo_update_key *-1,  locationDetailsIncomplete : photosState.cover_photos.length == 0  })
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: lightBg, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               <div style={{ width: '80%', height: '10%', backgroundColor: "rgb(75,75,72)"}}>
                <div style={{ backgroundColor: 'rgba(1, 1, 1, 0.7)', width: '100%', height: '10%', flexDirection: 'column'}}>
                        <div style={{ backgroundImage: `url(${skylineBackground})`,  backgroundSize: 'cover', backgroundRepeat: 'no-repeat',
                            display: 'flex', 
                            flexDirection: 'column', 
                            justifyContent: 'center', 
                            width: '100%',
                            height: 200
                        }}>
                            <h3 style={{color: 'whitesmoke', 
                                textShadowColor: 'rgba(0, 0, 0, 1)', 
                                textShadowOffset: {width: -1, height: 1}, 
                                textShadowRadius: 10 }}>New Listing</h3>
                        </div>
                    </div> 
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row',  width: '80%' }}>
                   
                    <Button className="tabItem" onClick={() => this.handleTabPress(0)}>
                      Location
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(1)} disabled={this.state.location == undefined}>
                      Contact Info
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(2)} disabled={this.state.contactInfoIncomplete}>
                      Location Details
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(3)} disabled={this.state.locationDetailsIncomplete}>
                        Pricing and terms
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(4)} disabled={this.state.locationDetailsIncomplete}>
                        Submit
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 1)'}}>
                    <div style={(this.state.index == 0) ? {} : { display : 'none'} }> 
                      <SelectLocation setLocation={this.setLocation}/>
                    </div>
                    <div style={(this.state.index == 1) ? {} : { display : 'none'} }> 
                        <ContactInfo addFormInfo={this.addFormInfo} 
                            handleNext={this.handleNext} 
                            handleSetPhotos={this.handleSetPhotos} 
                            photos={this.state.photos.contact_photos} 
                            handleRemovePhoto={this.removePhoto} 
                            photoKey={this.state.photo_update_key}
                        />
                    </div>
                    <div style={(this.state.index == 2) ? {} : { display : 'none'}}> 
                        <LocationDetails 
                            addFormInfo={this.addFormInfo}  
                            handleNext={this.handleNext}
                            handleSetPhotos={this.handleSetPhotos} 
                            photos={this.state.photos} 
                            photo_update_key={this.state.photo_update_key}
                            handleRemovePhoto={this.removePhoto} 
                        />
                    </div>
                    <div style={(this.state.index == 3) ? {} : { display : 'none'}}> 
                        <PricingInfo addFormInfo={this.addFormInfo}  handleNext={this.handleNext} photoKey={this.state.photo_update_key}/>
                    </div>
                    <div style={(this.state.index == 4) ? {} : { display : 'none'}}> 
                         <Submit formData={this.state.formData} photos={this.state.photos} photoKey={this.state.photo_update_key}/>
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


 export default connect(mapStateToProps)(AddListing)
