import React from 'react'
import Guage from './UI/Guage'
class DecisonLogicPanel extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
       return(
        <Guage percent={0.86}/>
       )
    }
 }

 export default DecisonLogicPanel