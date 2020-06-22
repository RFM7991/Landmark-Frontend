import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import { Link, withRouter } from 'react-router-dom'
import { getListings, getNearbyListings } from "../../Requests/listings-requests"
import ListingItem from "./ListingItem"
import Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getZipCode } from '../../Requests/geolocation-requests'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingPreviews extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            listings : [],
            startIndex: 0,
            limit : 20,
            zip : "",
            distance : 10
        }

        this.handleGeoLocation = this.handleGeoLocation.bind(this)
    }

    async componentDidMount() {

        let data = await getListings(this.state.startIndex, this.state.limit)
        console.log("GET", data)
        this.setState({ listings : data })

        let geoAvailable = false;

        if ("geolocation" in navigator) {
            geoAvailable = true 
            console.log("Available");
          } else {
            geoAvailable = false
            console.log("Not Available");
          }



        if (geoAvailable) {
            console.log("TRY")
            navigator.geolocation.getCurrentPosition(this.handleGeoLocation)
        }


        
    }

    async handleGeoLocation(position) {
        console.log(position)

        let res = await getZipCode({ lng : position.coords.longitude, lat: position.coords.latitude })

        if (res[0] != undefined) {
            this.setState({zip :  res[0]["zip-code-tabulation-area"]})
        }



        console.log("ZIP_RES", res)
    }

    render() {
      
        return (
            <div style={{  width: '100%', height: '80%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ width: '100%',  backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                   <div style={{ display: 'flex'}}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0em 1em 0em 1em"}}>
                            <span style={{ marginRight: '1em'}}>Zip</span>
                            <Form.Control value={this.state.business_type_option} as="input" name="zip" value={this.state.zip} onChange={this.onBusinessFormChange} style={{flex: 1,  display: 'inline', maxMenuHeight: '200px', }}>
                        
                        
                            </Form.Control> 
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: "0em 1em 0em 1em", }}>
                            <span style={{ marginRight: '1em'}}>Distance</span>
                            <Form.Control value={this.state.distance} as="select" name="distance" onChange={this.onBusinessFormChange} style={{flex: 1, textAlign: 'center', display: 'inline', maxMenuHeight: '200px', }}>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                        
                            </Form.Control> 
                        </div>
                    </div>

                    <div style={{ marginRight: '2em'}}>
                        <Button disabled={this.state.zip.length == 0}>
                            Search
                        </Button>
                    </div>

                </div>
              <div id="previewHeader" style={{ width: '100%', backgroundColor: darkBg, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h3  style={{ color: 'white', textAlign: 'left', paddingTop: '0.5em', paddingLeft: '0.5em'}}>Recent Listings</h3>
                </div>
              {
                  this.state.listings.map((listing, i) =>  {
                      return (
                        <ListingItem listing={listing} index={i}/>
                      )
                  })
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

 export default withRouter(connect(mapStateToProps)(ListingPreviews))
