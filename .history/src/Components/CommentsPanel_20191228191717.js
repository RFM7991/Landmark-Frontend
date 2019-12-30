import React  from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect';
import * as selectors from '../Reducers/selectors'
import SubwayIcon from '../images/subway.png'
import Table from 'react-bootstrap/Table'
import ReactTableContainer from "react-table-container";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { getComments, createComment } from '../Requests/locations-requests'
const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'
const textPrimary = 'whitesmoke'

class CommentsPanel extends React.Component {

    constructor(props) {
        super(props)
       
        this.state = {
            comments: [],
            body: ''
        }
    }

    async componentDidMount() {
        let comments = await getComments(this.props.address.place.place_id)
        this.setState({comments: comments.res})
    }

    handleSubmit = async () => {
        let pid = this.props.address.place.place_id
        let user = {
            first : this.props.user.first,
            last: this.props.user.last,
            username: this.props.user.username,
            _id: this.props.user._id
        } 
        let body = this.state.body
        console.log(pid, user, body)
        let results = await createComment(pid, user, body)
        console.log('CREATE COMMENT', results)
        // handle failed post
        let comments = await getComments(this.props.address.place.place_id)
        this.setState({comments: comments.res})

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
                <h1 style={{color: 'whitesmoke', }}>Comments</h1>
                <ReactTableContainer height={this.state.tableHeight} width='100%' customHeader={[header]}>
                    <Table striped hover variant="dark">
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
                       {this.props.user._id != -1 && <Button variant='primary'  onClick={this.handleSubmit} style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}}>Submit</Button>}
                       {this.props.user._id == -1 && <div><Button variant='primary'  onClick={this.handleSubmit} style={{backgroundColor:'#00d4ff', fontWeight: 'bold'}} disabled>Submit</Button> <p>Sign in to comment</p></div>}
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
                <div>
                <tr key={(i)}>

                    <td>
                        <div><div style={{display: 'flex', fontSize: '14px', width: '10%'}}>
                        <div style={{display: 'inline-block'}}>
                            <img src={SubwayIcon} width={30} height={30}/>
                        </div>
                        <p style={{marginLeft: '3em', fontWeight: 'bold'}}>{e.user.username}</p>
                        </div>
                        </div>
                    </td>
                    
                </tr>
                <tr key={(i * -1)}>
                <td>
                        {e.body}
                    </td>
                </tr>
                </div>
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


 export default connect(mapStateToProps)(CommentsPanel)