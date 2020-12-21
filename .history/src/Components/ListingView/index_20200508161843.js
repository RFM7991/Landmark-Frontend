import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/addListing.css';
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'
import { Link, withRouter } from 'react-router-dom'
import { getListingById } from '../../Requests/listings-requests'
import { join } from 'path';
import Table from 'react-bootstrap/Table'

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
        console.log("LIST_VIEW_MOUNT")
        // get listing info from url params
        if (this.props.urlParams) {
            console.log("LISTING_URL_PARAMS", this.props.urlParams)

            if (this.props.urlParams.listingId != undefined) {
                let res = await getListingById(this.props.urlParams.listingId)

                if (res.length > 0) {
                    this.setState({ listingData : res[0]})
                }
                
                
                console.log('get listing from id', res)
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
                console.log(i, j, photosState[category][i].name == photos[j].name, photosState[category][i].name, photos[j].name)
                if (photosState[category][i].name == photos[j].name) {
                    removals.push(j)
                    break;
                }
            }
            
        }
        console.log('INPUT_PHOTOS', photos, removals)
        for (let i=0; i < removals.length; i++) {
            photos.splice(removals[i], 1)
        }

        console.log('UNIQUE_PHOTOS', photos)

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
                            textShadowRadius: 10 }}>Listing View</h3>
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
                </div>
                <div style={{ display: 'flex', flexDirection: 'column',  width: '80%', height: '100%', backgroundColor: 'rgba(255,255,255, 0.7)'}}>
                    <div style={(this.state.index == 0) ? {} : { display : 'none'} }> 
                        { this.state.listingData != undefined &&
                            <div>
                            {Object.entries(this.state.listingData).map(([key, value], i) => {
                                return (
                                    <Table striped bordered hover variant="dark" >
                                        <thead><tr>{key}</tr></thead>
                                    
                                        <tbody>
                                            {Object.entries(value).map(( [v_key, v_value]) => {
                                                if (key == '_id') return;
                                                if (key == 'photos') return;
                                                console.log(v_key, v_value)
                                                return (
                                                   
                                                        <tr>
                                                        <td>{v_key}</td>
                                                        </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                                
                                        
                                    </Table>
                                    )
                                })
                            }
                                
                            </div>

                        }
                    </div>
                    <div style={(this.state.index == 1) ? {} : { display : 'none'} }> 
                     
                    </div>
                    <div style={(this.state.index == 2) ? {} : { display : 'none'}}> 
                     
                    </div>
                    <div style={(this.state.index == 3) ? {} : { display : 'none'}}> 
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


 export default withRouter(connect(mapStateToProps)(ListingView))
