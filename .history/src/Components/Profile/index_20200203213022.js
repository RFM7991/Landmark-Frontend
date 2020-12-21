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
                            <CommentsRows comments={this.state.comments}/>
                        </tbody>
                    </Table>
                </ReactTableContainer>
                <div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control value={this.state.body} onChange={this.handleChange} as="textarea" placeholder='Enter comments here'rows="3" />
                        </Form.Group>

                    </Form>
                </div>
            </div>    
       )
    }
 }
 const CommentsRows = (props) => {
    return (
       props.comments.map((e,i) => {
            return (
                <tr key={i}>

                    <td>
                        <div style={{  width: '100%', height: '25%'}}>
                            <div style={{display: 'flex', fontSize: '14px',  alignItems: 'center', alignContent: 'center' }}>
                                <div style={{}}>
                                    <img src={'https://media-exp1.licdn.com/dms/image/C4E03AQGIviyGnEnlyQ/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=RIDnoFwrm22DeH-yGzlaZvLewKS6MDXIza6YrWK5GOQ'} 
                                    width={45} height={45} style={{borderRadius: 30, marginLeft: '1em'}}/>
                                </div>
                                <p style={{marginLeft: '1em'}}>
                                    <span style={{fontWeight: 'bold'}}> {e.user.username}</span>
                                    <br></br>
                                    <span style={{ opacity : 0.7}}>{getDateDisplay(e.date)}</span>
                                </p>
                            </div>
                            <p style={{ marginLeft: '1em'}}>{e.body}</p>
                        </div>
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