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
            <div style={{display: 'flex',  alignItems: 'center', width: '90%', margin: 'auto', marginBottom: '2em',justifyContent: 'space-around', backgroundColor: lightBG}}>
                <DoughnutChart title={'Gender'} backgroundColor={darkBg}></DoughnutChart>
                <DoughnutChart title={'Income'} backgroundColor={darkBg}></DoughnutChart>
                <DoughnutChart title={'Age'} backgroundColor={darkBg} ></DoughnutChart>
            </div>
        )
    }
}

export default ChartsPanel