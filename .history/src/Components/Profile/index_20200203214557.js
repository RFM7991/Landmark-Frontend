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
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class CommentsPanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            searches: [],
            body: ''
        }
    }

    async componentDidMount() {
        let searches = localStorage.getItem('recentSearches')
        if (searches != null) {
            this.setState({ searches : JSON.parse(searches)})
        }
    }

    handleSubmit = async () => {
    }

    handleChange = e => {
        this.setState({body: e.target.value})
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        let header =  <thead>
            <tr>
            </tr>
        </thead>
        return (
            <div style={{display: 'block',  flexDirection: 'column', marginTop: '1.5em', padding: '1.5em', width: '40%', backgroundColor: lightBg}}>
                <h1 style={{color: 'whitesmoke', }}>Recent Searches</h1>
                <ReactTableContainer height={this.state.tableHeight} width='100%' customHeader={[header]}>
                    <Table striped hover variant="light">
                        {header}
                        <tbody>
                            <SearchesRows searches={this.state.searches}/>
                        </tbody>
                    </Table>
                </ReactTableContainer>
            </div>    
       )
    }
 }
 const SearchesRows = (props) => {
    return (
       props.searches.map(([uid, value], i) => {
            return (
                <tr key={i}>
                    <td style={{ fontSize: 14}}>{(i+1)}</td>
                    <td>
                        <p style={{ fontSize: 14}}> {value.location.formatted}</p>
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

 export default connect(mapStateToProps)(CommentsPanel)