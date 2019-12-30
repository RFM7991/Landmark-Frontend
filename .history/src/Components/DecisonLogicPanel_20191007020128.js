import React from 'react'
import Guage from './UI/Guage'
class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
       return(
        <div>
            <div style={{width: '25%', height: '25%'}}>
                <Guage percent={0.86}/>
            </div>
        </div>
       )
    }
 }

 export default DecisonLogicPanel