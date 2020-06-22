import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../../Reducers/selectors'
import SubwayIcon from '../../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getComments, createComment } from '../../Requests/locations-requests'
import { Link } from 'react-router-dom'
import GridLoader from '../UI/GridLoader'
import ListingItem from './MyListingItem'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class RecentSearches extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            loading : true,
            body: '',
            listings : []
        }
    }

    async componentDidMount() {
       

    }


    render() {
 
        return (
            <div style={{display: 'block',  flexDirection: 'column', padding: '0.25em', width: '100%', height: '100%', backgroundColor: 'rgba(1,1,1,0.1)'}}>
              
        
            {this.props.loading &&  <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: darkBg}}> <GridLoader color={"#0892d0"}/> </div>}
            {!this.props.loading && 
                  this.props.listings.map((listing, i) =>  {
                      return (
                        <ListingItem listing={listing} index={i}/>
                      )
                  })
              }
              {!this.props.loading && this.props.listings.length == 0 &&  <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: darkBg, color : 'white'}}><p>You currently do not have any listings.</p></div>}
            </div>    
       )
    }
 }
 const SearchesRows = (props) => {

    const getURL = (value) => {
        return '"'+encodeURI(value.location.formatted) + '"/' + encodeURI(value.business_type.type) + '/' + encodeURI(value.distance)
    }

    let searches = [...props.searches].reverse()
    return (
       searches.map(([uid, value], i) => {
            return (
                <tr key={i} style={{ fontSize: 14}}>
                    <td style={{ fontSize: 14}}>{(i+1)}</td>
                    <td>
                        <Link to={getURL(value)}>{value.location.formatted}</Link>
                    </td>
                    <td>
                        <p>{value.business_type.type}</p>
                    </td>
                </tr>
            )
        }) 
    )
}

 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
     selectors.userSelector,
    (address, user) => ({
        address, user 
    })
 )

 const getDateDisplay = (timestamp) => {
    let today = new Date()
    let date =  new Date(timestamp)
    let months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (datesAreOnSameDay(today, date)) {
        let split = date.toLocaleTimeString().split(' ')
        return split[0].substring(0, split[0].lastIndexOf(':')) + ' ' + split[1] 
            +' '+  months[date.getMonth()] +' '+ date.getDate() + ', '+ date.getFullYear()
    } else {
        return months[date.getMonth()] +' '+ date.getDate() + ', '+ date.getFullYear()
    }
 }

 const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

 export default connect(mapStateToProps)(RecentSearches)