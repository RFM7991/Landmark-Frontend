import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import '../../css/listingView.css';
import Button from 'react-bootstrap/Button';
import skylineBackground from '../../images/skyline_background.png'
import { Link, withRouter } from 'react-router-dom'
import { getRecents } from '../../Requests/listings-requests'
import Table from 'react-bootstrap/Table'
import GridLoader from "../UI/GridLoader"
import MultiSlideshow from "./MultipleSlideShow"
import { GOOGLE_KEY, google } from "../../Constants"
import GoogleMapReact from 'google-map-react';
import { renderMarker, BLUE_MARKER } from "../GoogleMapComponents"
import Image from 'react-bootstrap/Image'

const S3_BASE = "https://landmarkbucket2.s3.amazonaws.com/"
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class ListingPreviews extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            listings : []
        }
    }

    async componentDidMount() {
        let data = await getRecents()
        data = data.concat(data)
        let triplets = [[]]
        let tripletIndex = 0
        for (let i=0; i < data.length; i++) {
            if (triplets[tripletIndex].length == 3) {
                tripletIndex += 1
                triplets.push([])
            }

            else if (triplets[tripletIndex].length < 3) {
                triplets[tripletIndex].push(data[i])
            }
        }

        console.log("LISITNGS", triplets)

        this.setState({ listings : triplets })
    }


    getUrl = () => {
        let address = encodeURI(JSON.stringify(this.state.listingData.location.formatted))
        let business_type = "restaurant"
        let url = '/' + address + '/' + business_type
        return url
    }


    render() {
      
        return (
            <div style={{ width: '100%', height: '80%',  display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
               
                <div style={{ width: '100%', backgroundColor: lightBg, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <h3 id="previewHeader" style={{ color: 'white', textAlign: 'left', padding: '0.5em'}}>Recent Listings</h3>
                    <Link id="previewHeader" to={"/listings/browse"} style={{ padding: '0.5em', color: 'white' }}>See More...</Link>
                </div>
                <MultiSlideshow width={'100%'} height={'400px'} data={this.state.listings}/>
                         
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


 export default withRouter(connect(mapStateToProps)(ListingPreviews))
