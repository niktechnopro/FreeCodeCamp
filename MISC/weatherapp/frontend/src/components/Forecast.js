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
					{imgCache(value.weather[0].icon)}
				</div>
			)
		})
	}


	function specificDay(day){
		let thisDay = forecast.filter(value => {
			return value.dt_txt.slice(0,10) === day
		});
		props.thisDay(thisDay);
	}

	function thisDayImage(icon){
		let url;
		if(sessionStorage.getItem(icon)){
			url = sessionStorage.getItem(icon);
		}else{
			url = `https://openweathermap.org/img/w/${icon}.png`
		}
		console.log(url)
		return url;		
	}

	const canvasMaker = async (img) => {
		console.log("inside canvasMaker", img)
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;
		img.getContext("2d").drawImage(img, 0, 0);
		var image = new Image();
		image.src = canvas.toDataURL("image/png");
		console.log(image)





		// let canvas = document.createElement('canvas');
		// let ctx = canvas.getContext('2d');
		// canvas.height = img.height;
		// canvas.width = img.width;
		// var image = new Image();
		// image.src = img.src;
		// image.onload
		// if(canvas && image.src){
		// 	console.log(JSON.stringify(image))
  // 			ctx.drawImage(image, 0, 0);
		// 	let base64String = canvas.toDataURL("image/png");
		// 	console.log(canvas)
		// 	return await base64String;
		// 	// return await base64String.replace(/^data:image\/(png|jpg);base64,/, "");
		// }
		// return await base64String.replace(/^data:image\/(png|jpg);base64,/, "");
	}

	function imgCache(icon){
		if(sessionStorage.getItem(icon)===null){
			let imgPromise = new Promise((resolve, reject) => {
			let image = document.getElementById(icon);
				if(image){
					resolve(image)
				}else{
					reject();
				}
			})
			imgPromise.then((img) => {
				canvasMaker(img).then(data64 => {
					console.log(data64)
					sessionStorage.setItem(icon, data64);
				}).catch(err => err)
			})
			.catch(error => console.log(error));
		}else{
			return
		}	
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