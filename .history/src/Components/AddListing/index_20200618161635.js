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
import skylineBackground from '../../images/backgrounds/cityscape_day2.jpg'
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
            index : 0,
            formData : { contactInfo : {}, locationDetails: {}, pricingInfo : {} },
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
               <div style={{ width: '80%', height: '10%', backgroundColor: 'white'}}>
                <div style={{ backgroundColor: 'rgba(1, 1, 1, 0.6)', width: '100%', height: '100%', flexDirection: 'column'}}>
                        <div style={{ backgroundImage: `url(${skylineBackground})`,  backgroundSize: 'contain', backgroundRepeat: 'no-repeat', 
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
                            photoKey={this.state.contact_photos_key}
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
                        <PricingInfo addFormInfo={this.addFormInfo}  handleNext={this.handleNext}/>
                    </div>
                    <div style={(this.state.index == 4) ? {} : { display : 'none'}}> 
                         <Submit formData={this.state.formData} photos={this.state.photos}/>
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
