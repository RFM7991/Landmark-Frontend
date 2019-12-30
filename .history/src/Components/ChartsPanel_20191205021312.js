import React, { component, Component } from 'react'
import DoughnutChart from './UI/DoughnutChart'

const darkBg = 'rgb(26,28,41)'
const lightBg = 'rgb(31,33,48)'

class ChartsPanel extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{display: 'flex',  alignItems: 'center', width: '95%', margin: 'auto', marginBottom: '2em',justifyContent: 'space-around'}}>
                <DoughnutChart title={'Gender'} backgroundColor={lightBg}></DoughnutChart>
                <DoughnutChart title={'Income'} backgroundColor={lightBg}></DoughnutChart>
                <DoughnutChart title={'Age'} backgroundColor={lightBg} ></DoughnutChart>
            </div>
        )
    }
}

export default ChartsPanel