import React from 'react';
import ReactChartkick, { LineChart, ColumnChart } from 'react-chartkick'
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart)



const ThisDay = (props) => {
	const {oneDayChart, date} = props;
	let data = timeScaleCreator(oneDayChart);
	data.then(time => finalObjectConstructor(time, oneDayChart));
	let values = Object.values(oneDayChart);
	let maxTemp = Math.max(...values).toFixed(2);
	let minTemp = (Math.min(...values)-3).toFixed(2);//just to lift it
	// console.log(keys, oneDayChart, minTemp, maxTemp);
	return(
		<div id="headerWrap">
			<p id="header">Temp for {date}</p>
			{values.length>0 && false && <LineChart 
			discrete={false} 
			width="350px" 
			height="190px"
			xtitle="Time"
			ytitle="Temperature"
			messages={{empty: "No data"}} 
			min={minTemp} max={maxTemp}
			data={props.oneDayChart} 
			/>
			}
			<ColumnChart 
			data={[["Sun", 32], ["Mon", 46], ["Tue", 28]]} 
			width="350px" 
			height="190px"
			/>
		</div>
	)
}

const timeScaleCreator = async (oneDayChart) => {
	let ams = [];
	let pms = [];
	let keys = Object.keys(oneDayChart);
	console.log(keys);
	//let's create array with AM
	let am = /AM/;
	let pm = /PM/;
	ams = keys.filter(value => {
		return value.match(am);
	});
	pms = keys.filter(value => {
		return value.match(pm);
	})
	if (pms.length > 0){
		let temp = pms.map(value => Number(value.match(/^(\d+)/)[1]));
		let onlyNumbers = temp.sort((a,b) => a-b);
		pms = onlyNumbers.map(value => String(value) + ' PM');
	}
	let allTogether = [...ams, ...pms];
	return await allTogether;
}

const finalObjectConstructor = async (timeArray, oneDayChart) => {
	console.log(timeArray, oneDayChart)
}


export default ThisDay;