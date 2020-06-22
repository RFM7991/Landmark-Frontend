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
import GridLoader from '../UI/GridLoader'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingPreviews extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            listings : [],
            index: 0,
            limit : 20,
            zip : "",
            browserZip : "",
            distance : 10,
            loading : true 
        }

        this.handleGeoLocation = this.handleGeoLocation.bind(this)
    }

    async componentDidMount() {

        let data = await getListings(this.state.index, this.state.limit)
      
        this.setState({ listings : data, loading : false  })

        let geoAvailable = false;

        if ("geolocation" in navigator) {
            geoAvailable = true 
          } else {
            geoAvailable = false
          }

        if (geoAvailable) {
            navigator.geolocation.getCurrentPosition(this.handleGeoLocation)
        }

    }

    async handleGeoLocation(position) {

        let res = await getZipCode({ lng : position.coords.longitude, lat: position.coords.latitude })

        if (res[0] != undefined) {
            this.setState({ browserZip :  res[0]["zip-code-tabulation-area"]})
        }

        console.log("ZIP_RES", res)
    }

    handleFormChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSearch = async () => {
        console.log("FIRE")
        this.setState({ loading : true })
        let res = await getNearbyListings(this.state.zip, this.state.distance)

        console.log("NEARBY", res)

        this.setState({ listings : res.results, loading : false })

    }

    handleMyLocation = () => {
        this.setState({ zip : this.state.browserZip })
    }

    render() {
        
      
        return (
            <div style={{  width: '100%', height: '80%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{ width: '100%',  backgroundColor: 'whitesmoke', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5em', paddingBottom: '0.5em'}}>
                   <div style={{ display: 'flex'}}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: "0em 1em 0em 1em"}}>
                            <span style={{ marginRight: '1em'}}>Zip</span>
                            <Form.Control as="input" name="zip" value={this.state.zip} onChange={this.handleFormChange} style={{flex: 1,  display: 'inline', maxMenuHeight: '200px', }}>
                            </Form.Control> 
                            <Button disabled={this.state.browserZip.length == 0} onClick={this.handleMyLocation} style={{ marginLeft: '1em'}}>
                                My Location
                            </Button>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',  margin: "0em 1em 0em 1em", }}>
                            <span style={{ marginRight: '1em'}}>Distance</span>
                            <Form.Control value={this.state.distance} as="select" name="distance" onChange={this.handleFormChange} style={{flex: 1, textAlign: 'center', display: 'inline', maxMenuHeight: '200px', }}>
                                <option>10</option>
                                <option>25</option>
                                <option>50</option>
                                <option>100</option>
                        
                            </Form.Control> 
                        </div>
                    </div>

                    <div style={{ marginRight: '2em'}}>
                        <Button disabled={this.state.zip.length == 0} onClick={this.handleSearch}>
                            Search
                        </Button>
                    </div>

                </div>
              <div id="previewHeader" style={{ width: '100%', backgroundColor: darkBg, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', color: 'white', }}>
                    <h3  style={{  textAlign: 'left', paddingTop: '0.5em', paddingLeft: '0.5em'}}>Recent Listings</h3>
                    {!this.state.loading && <span style={{ paddingBottom: '0.5em', paddingRight: '0.5em'}}>{this.state.listings.length} results found</span>}
              </div>
            {this.state.loading &&  <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: darkBg}}> <GridLoader color={"#0892d0"}/> </div>}
            {!this.state.loading && 
                  this.state.listings.map((listing, i) =>  {
                      return (
                        <ListingItem listing={listing} index={i}/>
                      )
                  })
              }
              {!this.state.loading && this.state.listings.length == 0 &&  <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: darkBg, color : 'white'}}><p>Sorry, there are no listings yet for these parameters</p></div>}
            <div style={{ width: '100%', height :'100%'}}>
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

 export default withRouter(connect(mapStateToProps)(ListingPreviews))
