import React, { component, Component } from 'react'
import DoughnutChart from './UI/DoughnutChart'

const darkBg = 'rgb(40,40,40)'
const lightBG = 'rgb(54,55,57)'

class ChartsPanel extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#343a40'}}>
                <DoughnutChart title={'Gender'} backgroundColor={lightBG}></DoughnutChart>
                <DoughnutChart title={'Income'} backgroundColor={lightBG}></DoughnutChart>
                <DoughnutChart title={'Age'} backgroundColor={lightBG} ></DoughnutChart>
            </div>
        )
    }
}

export default ChartsPanel