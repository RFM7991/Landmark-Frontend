import GaugeChart from 'react-gauge-chart'
import React from 'react';

class Guage extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        <GaugeChart id='guage-chart1'
        percent={this.props.percent}
        />
    }
}

export default Guage
