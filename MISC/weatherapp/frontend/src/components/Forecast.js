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
			let day=value.dt_txt.slice(0,10);
			return(
				<div key={date} className="cardWrap" onClick={()=>specificDay(day)}>
					<div className="singleCard">
						<p>{date}</p>
						{<img className="fImg" id={value.weather[0].icon} src={thisDayImage(value.weather[0].icon)} alt="icon" />}
						<p>{value.weather[0].main}</p>
					</div>
				</div>
			)
		})
	}

	// {imgCache(value.weather[0].icon)}

	function specificDay(day){
		let thisDay = forecast.filter(value => {
			return value.dt_txt.slice(0,10) === day
		});
		props.thisDay(thisDay);
	}

	function thisDayImage(icon){
		let url = `https://openweathermap.org/img/w/${icon}.png`
		return url;		
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