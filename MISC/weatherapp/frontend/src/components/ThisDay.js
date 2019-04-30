import React from 'react';
import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart)



const ThisDay = (props) => {
	const {oneDayChart, date} = props;
	//let keys = Object.keys(oneDayChart).sort();
	let values = Object.values(oneDayChart);
	let maxTemp = Math.max(...values).toFixed(2);
	let minTemp = (Math.min(...values)-3).toFixed(2);//just to lift it
	// console.log(keys, oneDayChart, minTemp, maxTemp);
	return(
		<div id="headerWrap">
			<p id="header">Temp for {date}</p>
			{values.length>0 && <LineChart 
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
		</div>
	)
}


export default ThisDay;