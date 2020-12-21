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
            index : 2,
            photos : { contact_photos : [], site_photos : []},
            contact_photos_key : -1,
            site_photos_key : -1

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

    addFormInfo = (data, category )=> {
        this.setState({ formData : {...this.state.formData, [category] : data }})
    }

    handleNext = () => {
        this.setState({ index : this.state.index+1})
        window.scrollTo(0, 0)
    }

    handleSetPhotos = (category, photos) => {
        let photosState = this.state.photos

        for (let i=0; i < photosState[category].length; i++) {
            for (let j=0; j < photos.length; j++) {
                console.log(i, j, photosState[category][i].name)
                if (photosState[category][i].name == photos[j].name) {
                    photos.splice(j, 1)
                    break;
                }
            }
            console.log('UNIQUE_PHOTOS', photos)
        }
        photosState[category] =  photosState[category].concat(photos)
        console.log("MASTER_PHOTOS", photos, photosState)

        this.setState({ photos : photosState})
    }

    removePhoto = (category, index) => {
        let photosState = this.state.photos
        photosState[category].splice(index, 1)
        console.log("REMOVE_PHOTOS", photosState)

        this.setState({ photos : photosState, [category + '_key'] : this.state[category + '_key'] *-1 })
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               <div style={{ backgroundColor: 'rgba(146, 176, 179, 0.6)', width: '80%', height: '10%', flexDirection: 'column'}}>
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
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'blue', flexDirection: 'row',  width: '80%' }}>
                   
                    <Button className="tabItem" onClick={() => this.handleTabPress(0)}>
                      Location
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(1)}>
                      Contact Info
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(2)}>
                      Location Details
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(3)}>
                        Pricing and terms
                    </Button>
                    <Button className="tabItem" onClick={() => this.handleTabPress(4)}>
                        Submit
                    </Button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
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
                            photos={this.state.photos.site_photos} 
                            handleRemovePhoto={this.removePhoto} 
                            photoKey={this.state.site_photos_key}
                            />
                    </div>
                    <div style={(this.state.index == 3) ? {} : { display : 'none'}}> 
                        <PricingInfo addFormInfo={this.addFormInfo}  handleNext={this.handleNext}/>
                    </div>
                    <div style={(this.state.index == 4) ? {} : { display : 'none'}}> 
                         <Submit formData={this.state.formData}/>
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
