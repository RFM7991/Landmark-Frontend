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
			case RACE:
				let raceStats = stats.social.race
				Object.entries(raceStats).map(([key,  value]) => { total += value})
				return [
					{name: 'African American', y: 100* (raceStats.african_american / total)},
					{name: 'Asian', y: 100 * (raceStats.asian / total)},
					{name: 'Hispanic', y: 100 * (raceStats.hispanic_or_latino / total)},
					{name: 'Mixed', y: 100 * (raceStats.mixed / total)},
					{name: 'White', y: 100 * (raceStats.white / total)}
				]
			case INCOME: 
				let incomeStats = Object.entries(stats.income).map(([key,  value]) => { 
					if (value == null || value == undefined) {
						console.log('NULL', key, value)
						return { key : 0}
					} else return {key, value}
				})
				console.log('METHOD', incom)
				Object.entries(incomeStats).map(([key,  value]) => { total += value})
				let data = [
					{name: '0 - 35k', y: 100* (
						(incomeStats._0_9999
						+ incomeStats._10000_14999
						+ incomeStats._20000_24999
						+ incomeStats._25000_29999
						+ incomeStats._30000_34999) / total)},
					{name: '35k - 50k', y: 100 * (
						(incomeStats._35000_39999
						+ incomeStats._40000_44999
						+ incomeStats._45000_49999) / total)},
					{name: '50k - 75k', y: 100 * (
						(incomeStats._50000_59999
						+ incomeStats._60000_74999) / total)},
					{name: '75k - 100k', y: 100 * (
						(incomeStats._75000_99999) / total)},
					{name: '100k - 200k', y: 100 * (
						(incomeStats._100000_124999
						+ incomeStats._125000_149999
						+ incomeStats._150000_199999) / total)},
					{name: '200k+', y: 100 * (incomeStats._200000_MORE / total)}
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