import React from 'react';
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js';

ReactChartkick.addAdapter(Chart)



const ThisDay = (props) => {
	const {oneDayChart, date, minTemp, maxTemp} = props;	
	// console.log(date, oneDayChart, minTemp, maxTemp);
	return(
		<div id="headerWrap">
			<p id="header">Temp for {date}</p>
			<ColumnChart 
			data={oneDayChart} 
			width="350px" 
			height="190px"
			min={minTemp} 
			max={maxTemp}
			xtitle="Time of the Day"
			ytitle="Temperature"
			/>
		</div>
	)
}

export default ThisDay;
