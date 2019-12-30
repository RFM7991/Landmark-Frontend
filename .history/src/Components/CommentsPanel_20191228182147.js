import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import SubwayIcon from '../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getComments } from '../Requests/locations-requests'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class CommentsPanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
        }
    }

    async componentDidMount() {
        let res = await getComments()
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        let header =  <thead>
            <tr>
            </tr>
        </thead>
        return (
            <div style={{display: 'block',  flexDirection: 'column', padding: '1.5em', width: '40%', backgroundColor: lightBg}}>
                <h1 style={{color: 'whitesmoke', }}>Comments</h1>
                <ReactTableContainer height={this.state.tableHeight} width='100%' customHeader={[header]}>
                    <Table striped hover variant="dark">
                        {header}
                        <tbody>
                            
                        </tbody>
                    </Table>
                </ReactTableContainer>
                <div>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label></Form.Label>
                            <Form.Control as="textarea" placeholder='Enter comments here'rows="3" />
                        </Form.Group>
                        <Button variant='primary' style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>    
       )
    }
 }
 const SubwaysRows = (props) => {
     console.log('TRANSPORT', props.transportation)
    if (props.transportation.subways == undefined || props.transportation.subways.length == 0)
        return<></>;
    return (
       props.transportation.subways.map((e,i) => {
           if (i > 3) return;
            return (
                <tr key={(i)}>
                    <td>{(i+1)}</td>
                    <td>{e.name}</td>
                    <td>{e.data.G_LINES}</td>
                    <td>{formatCommas(e.data.G_TOTAL_ENT)}</td>
                    <td>{formatCommas(e.data.G_TOTAL_EXITS)}</td>
                    <td>{e.directions.distance.text}</td>
                    <td>{e.directions.duration.text}</td>
                </tr>
            )
        }) 
    )
}

 
 const mapStateToProps = createSelector(
     selectors.addressSelector,
    (address) => ({
        address, 
    })
 )

 const formatCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
}

 export default connect(mapStateToProps)(CommentsPanel)