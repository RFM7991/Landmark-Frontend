import React, { Component } from 'react';
import CanvasJSReact from '../Assets/canvasjs.react'
import { connect } from 'react-redux'
import { dataRangeSelector, statsSelector } from '../Reducers/selectors'
import { createSelector } from 'reselect';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class DoughnutChart extends Component {

	componentDidUpdate(prevProps) {
		if (this.props.data_range != prevProps.data_range) {
			console.log('Props changed', this.props.data_range)
		}
		if (prevProps.stats.zip == undefined && this.props.stats.zip != undefined) {
			console.log('Props changed: ZIP', this.props.stats.zip)
		}
		if (prevProps.stats.tradezone == undefined && this.props.stats.tradezone != undefined) {
			console.log('Props changed: TZ', this.props.stats.tradezone)
		}
	}
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
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: [
					{ name: "Unsatisfied", y: 5 },
					{ name: "Very Unsatisfied", y: 31 },
					{ name: "Very Satisfied", y: 40 },
					{ name: "Satisfied", y: 17 },
					{ name: "Neutral", y: 7 }
				]
			}]
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