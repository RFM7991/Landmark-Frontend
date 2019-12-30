import GaugeChart from 'react-gauge-chart'
import React from 'react';

class Guage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            percent = 0.86
        }
    }

    render() {
        <GaugeChart id='guage-chart1'
        percent={this.state.percent}
        />
    }
}

export default Guage
