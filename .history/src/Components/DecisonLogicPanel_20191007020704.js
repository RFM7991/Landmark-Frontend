import React from 'react'
import Guage from './UI/Guage'
import { connect } from 'react-redux'

class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
       return(
        <div>
            <div style={{width: '100%', height: '100%'}}>
                <Guage percent={0.50}/>
            </div>
        </div>
       )
    }
 }

 export default connect(DecisonLogicPanel)