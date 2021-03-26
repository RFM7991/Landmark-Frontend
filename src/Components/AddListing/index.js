import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import ContactInfo from './ContactInfo'
import LocationDetails from './LocationDetails'
import PricingInfo from './PricingInfo'
import SelectLocation from './SelectLocation'
import Submit from './submit'
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom'
import { getListingById } from "../../Requests/listings-requests"

class AddListing extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            body: '',
            index : 0,
            formData :  { contactInfo : {}, locationDetails: {}, pricingInfo : {} },
         //   {"_id":{"$oid":"5eb5a860c1a797ac66c79d31"},"location":{"formatted":"Ippudo NY, 4th Avenue, New York, NY, USA","street":"65 4th Ave","city":"New York","state":"NY","zip":"10003","coords":{"lat":40.730948,"lng":-73.990287},"place":{"access_points":[],"address_components":[{"long_name":"65","short_name":"65","types":["street_number"]},{"long_name":"4th Avenue","short_name":"4th Ave","types":["route"]},{"long_name":"Manhattan","short_name":"Manhattan","types":["political","sublocality","sublocality_level_1"]},{"long_name":"New York","short_name":"New York","types":["locality","political"]},{"long_name":"New York County","short_name":"New York County","types":["administrative_area_level_2","political"]},{"long_name":"New York","short_name":"NY","types":["administrative_area_level_1","political"]},{"long_name":"United States","short_name":"US","types":["country","political"]},{"long_name":"10003","short_name":"10003","types":["postal_code"]}],"formatted_address":"65 4th Ave, New York, NY 10003, USA","geometry":{"location":{"lat":40.730948,"lng":-73.990287},"location_type":"ROOFTOP","viewport":{"south":40.7295990197085,"west":-73.9916359802915,"north":40.7322969802915,"east":-73.98893801970848}},"place_id":"ChIJWUOc55tZwokR9q_g5l051rk","plus_code":{"compound_code":"P2J5+9V New York, United States","global_code":"87G8P2J5+9V"},"types":["establishment","food","point_of_interest","restaurant"]}},"contactInfo":{"forSale":"yes","forLease":"no","relationship":"broker","ownershipDetails":"Shane Inman discusses his commitment to excellence in customer service as well as his depth of experience in the real estate industry. Inman’s occupational pride is evident, as is his devotion to the company’s design expertise. Call (973) xxx-xxxx for details"},"locationDetails":{"sizeDetails":"12334","dimensionDetails":"123434","position":"in-line","tenantMixDetails":"aSas","parkingSpaceDetails":"12233","designatedParkingDetails":"yes","underConstruction":"no","ingressInfo":"asdasd","hasOccupancyCert":"yes","hasZoning":"yes"},"pricingInfo":{"askingPrice":"1234","leasePricePerSquareFoot":"1233","leaseTermDetails":"2 years","maintainenceCostPerSquareFoot":"123","insuranceCostPerSquareFoot":"1222","isAssignment":"no","isSublet":"no"},"listingId":280085022,"photos":{"contact_photos":["listings/280085022/contact_photos/upload1.png"],"site_photos":["listings/280085022/site_photos/upload1.jpg","listings/280085022/site_photos/upload2.jpg","listings/280085022/site_photos/upload3.jpg"],"cover_photos":["listings/280085022/site_photos/upload3.jpg"]}},
            photos : { cover_photos : [], contact_photos : [], site_photos : []},
            contactInfoIncomplete : true,
            locationDetailsIncomplete : true,
            pricingInfoIncomplete : true,
            updateInfo: {},
            isUpdate: false,
            photo_update_key : -1 // needed for [][] to descend to children 

        }
    }

    componentDidMount() {
       this.verifyUser()
       this.handleUpdateParams()
    }

    verifyUser = () => {
        const { user } = this.props
        if (user._id === -1) {
            this.props.history.push('/login')
        }
    }

    handleUpdateParams = async () => {
        const { urlParams } = this.props
        if (!urlParams.listingId) return

        let res = await getListingById(urlParams.listingId)
        this.setState({ 
            index: 1,
            formData: res[0], 
            location: res[0].location,
            contactInfoIncomplete: false,
            locationDetailsIncomplete: false,
            pricingInfoIncomplete: false,
            isUpdate: true
        })
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
        this.setState({ contactInfoIncomplete : this.state.formData.contactInfo.forSale === undefined || this.state.formData.contactInfo.forLease == undefined || this.state.formData.contactInfo.relationship === undefined })
    }

    handleNext = () => {
        this.setState({ index : this.state.index+1})
        window.scrollTo(0, 0)
    }

    handleSetPhotos = async (category, photos) => {
        let photosState = this.state.photos
        let removals = []

        for (let i=0; i < photosState[category].length; i++) {
            for (let j=0; j < photos.length; j++) {
                if (photosState[category][i].name === photos[j].name) {
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
    }

    removePhoto = (category, index) => {
        let photosState = this.state.photos
        photosState[category].splice(index, 1)

        this.setState({ photos : photosState, photo_update_key : this.state.photo_update_key *-1,  locationDetailsIncomplete : photosState.cover_photos.length == 0  })
    }

    render() {
        return (
            <div className="addListingPage">
               <div className="bannerContainer">
                <div className="bannerHeader">
                        <div className="bannerImage" >
                            <h3 className="bannerText">New Listing</h3>
                        </div>
                    </div> 
                </div>
                <div className="toolbarContainer">  
                    <Button className="tabItem" disabled={this.state.isUpdate} onClick={() => this.handleTabPress(0)}>
                      <span>Location</span>
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(1)} disabled={this.state.location === undefined}>
                      <span>Contact Info</span>
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(2)} disabled={this.state.contactInfoIncomplete}>
                        <span>Location Details</span>
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(3)} disabled={this.state.locationDetailsIncomplete}>
                        <span>Pricing/terms</span>
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(4)} disabled={this.state.locationDetailsIncomplete}>
                        <span>Submit</span>
                    </Button>
                </div>
                <div className="formPageContainer">
                    <div style={(this.state.index === 0) ? {} : { display : 'none'} }> 
                      <SelectLocation setLocation={this.setLocation}/>
                    </div>
                    <div style={(this.state.index === 1) ? {} : { display : 'none'} }> 
                        <ContactInfo addFormInfo={this.addFormInfo} 
                            handleNext={this.handleNext} 
                            handleSetPhotos={this.handleSetPhotos} 
                            photos={this.state.photos.contact_photos} 
                            handleRemovePhoto={this.removePhoto} 
                            photoKey={this.state.photo_update_key}
                            updateInfo={this.state.formData.contactInfo}
                            isUpdate={this.state.isUpdate}
                        />
                    </div>
                    <div style={(this.state.index === 2) ? {} : { display : 'none'}}> 
                        <LocationDetails 
                            addFormInfo={this.addFormInfo}  
                            handleNext={this.handleNext}
                            handleSetPhotos={this.handleSetPhotos} 
                            photos={this.state.photos} 
                            photo_update_key={this.state.photo_update_key}
                            handleRemovePhoto={this.removePhoto} 
                            updateInfo={this.state.formData.locationDetails}
                            isUpdate={this.state.isUpdate}
                        />
                    </div>
                    <div style={(this.state.index === 3) ? {} : { display : 'none'}}> 
                        <PricingInfo 
                            addFormInfo={this.addFormInfo}  
                            handleNext={this.handleNext} 
                            photoKey={this.state.photo_update_key}
                            updateInfo={this.state.formData.pricingInfo}
                            isUpdate={this.state.isUpdate}
                        />
                    </div>
                    <div style={(this.state.index === 4) ? {} : { display : 'none'}}> 
                         <Submit 
                            formData={this.state.formData} 
                            photos={this.state.photos} 
                            photoKey={this.state.photo_update_key}
                            isUpdate={this.state.isUpdate}
                        />
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


 export default withRouter(connect(mapStateToProps)(AddListing))
