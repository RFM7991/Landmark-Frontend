import React, { component, Component } from 'react'
import DoughnutChart from './UI/DoughnutChart'

class ChartsPanel extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{display: 'flex',  alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#343a40'}}>
                <DoughnutChart title={'Gender'} backgroundColor={'#343a40'}></DoughnutChart>
                <DoughnutChart title={'Income'} backgroundColor={'#343a40'}></DoughnutChart>
                <DoughnutChart title={'Age'} backgroundColor={'#343a40'} ></DoughnutChart>
            </div>
        )
    }
}

export default ChartsPanel