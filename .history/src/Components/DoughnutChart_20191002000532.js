import React, { Component } from 'react';
import CanvasJSReact from '../Assets/canvasjs.react'
import { connect } from 'react-redux'
import { dataRangeSelector, statsSelector } from '../Reducers/selectors'
import { createSelector } from 'reselect';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class DoughnutChart extends Component {
	render() {
		console.log('DOUGHNUTS', this.props)
		const options = {
			animationEnabled: true,
			title: {
				text: this.props.title
			},
			subtitles: [{
				text: "",
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: []
		}
		
		return (
		<div style={{ width: '20rem', height: '50%', marginRight: '5rem', marginLeft: '5rem'}}>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}


const mapStateToProps = createSelector(
    dataRangeSelector,
    statsSelector,
    (data_range, stats) => ({
        data_range, stats
    })
);

export default connect (mapStateToProps)(DoughnutChart);