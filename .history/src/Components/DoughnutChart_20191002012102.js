import React, { Component } from 'react';
import CanvasJSReact from '../Assets/canvasjs.react'
import { connect } from 'react-redux'
import { dataRangeSelector, statsSelector } from '../Reducers/selectors'
import { createSelector } from 'reselect';
import { ZIP, TRADE_ZONE} from './DemographicsPanel'
import { stat } from 'fs';
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
const GENDER = 'Gender'
const INCOME = 'Income'
const RACE = 'Race'
 
class DoughnutChart extends Component {

	constructor(props) {
		super(props)

		this.chartOptions = this.chartOptions.bind(this)
		this.getDataPoints = this.getDataPoints.bind(this)
		this.selectStats = this.selectStats.bind(this)
	}

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

	selectStats = () => {
		switch (this.props.data_range) {
			case ZIP:
				return this.props.stats.zip
			case TRADE_ZONE:
				return this.props.stats.tradezone
			default: return undefined
		}
	}
	getDataPoints = () => {
		let stats = this.selectStats()
		if (stats == undefined) return []	
		let total = 0
		switch (this.props.title) {
			case GENDER: 
				 let genderStats = stats.social.summary.gender
				Object.entries(genderStats).map(([key,  value]) => { total += value})
				return  [
					{name: 'Males', y: 100* (genderStats.males / total)},
					{name: 'Females', y: 100 * (genderStats.females / total)}
				]
			case INCOME: return [] 
			case RACE:
				let raceStats = stats.social.summary.stats
				Object.entries(raceStats).map(([key,  value]) => { total += value})
				let data = [
				//	{name: 'Males', y: 100* (genderStats.males / total)},
				//	{name: 'Females', y: 100 * (genderStats.females / total)}
				]
				console.log('DATA', data)
				return data;
			default: return []
		}
	}

	chartOptions = () => {
		console.log('GET DATA',this.props.title,  this.getDataPoints())
		
		return  {
			animationEnabled: true,
			subtitles: [{
				text: this.props.title,
				verticalAlign: "center",
				fontSize: 24,
				dockInsidePlotArea: true
			}],
			data: [{
				type: "doughnut",
				showInLegend: true,
				indexLabel: "{name}: {y}",
				yValueFormatString: "#,###'%'",
				dataPoints: this.getDataPoints()
			}]
		}
	}
	render() {
		console.log('DOUGHNUTS', this.props)
	
		
		return (
		<div style={{ width: '20rem', height: '50%', marginRight: '5rem', marginLeft: '5rem'}}>
			<CanvasJSChart options = {this.chartOptions()} 
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