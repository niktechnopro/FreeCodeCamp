import React from 'react';



const Forecast = (props) => {
	const { forecast } = props;
	function filterForecast(){//making the forecast logic
		//we need to filter array to specific time
		let arrayOfDates = forecast.filter((value)=>{
			return value.dt_txt.includes("12:00:00");
		})
		// console.log(arrayOfDates);
		//let's build a logic to produce these dates;
		return arrayOfDates.map((value) => {
			let date=value.dt_txt.slice(5,10);
			return(
				<div key={date} className="cardWrap">
					<div className="singleCard">
						<p>{date}</p>
						{<img className="fImg" src={`http://openweathermap.org/img/w/${value.weather[0].icon}.png`} alt="icon" />}
						<p>{value.weather[0].main}</p>
					</div>
				</div>
			)
		})
	}






	return(
		<div id="forecastWrap">
			<p className="weatherHeadline">Five days forecast</p>
			<div className="forecast">
				{filterForecast()}
			</div>
		</div>
	)
}


export default Forecast;