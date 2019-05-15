import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import Forecast from "./Forecast";
import ThisDay from "./ThisDay";
import { onTimeWeatherObject } from './actionCreators/actionCreators';

const FirstLoadScreen = (props) => {
	return(
		<div className="autodetectScreen">
			{props.isFirstLoad ? <p>Wait while we're detecting your location Or Input Address Yourself</p> : null}
		</div>
	)
}

const ErrorScreen = (props) => {
	return(
		<div className="errorScreen">
			<p>Ooops, something went wrong...</p>
			<p>Try entering another address</p>
		</div>
	)
}

const SearchScreen = (props) => {
	return(
		<div className="searchScreen">
			<p>Working...</p>
		</div>
	)
}

class WeatherField extends Component{
	constructor(props){
		super(props)
		this.state = {
			weatherData: null,
			temperature: null,
			humidity: null,
			claudiness: null,
			directionNames: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
			wind: {},
			weather: [],
			icon: null,
			isFirstLoad: true,
			error: false,
			timeWeatherObject: {},
			keys: [],
			date: "",
			oneDayChart: [],
			minTemp: 0,
			maxTemp: 0
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(!prevProps.error && this.props.error){
			this.setState({
				error: true
			})
		}
		if(this.state.isFirstLoad && prevProps.geoData===null && this.props.geoData && !this.props.error){
			this.setState({
				isFirstLoad: false
			})
		}
		if(!this.props.isLoading && this.props.weatherData !== this.state.weatherData){
			this.setState({
				weatherData: this.props.weatherData
			},()=>{
				if(this.props.weatherData && this.props.weatherData.main){
					this.setState({
						temperature: this.state.weatherData.main.temp,
						humidity: this.state.weatherData.main.humidity,
						claudiness: this.state.weatherData.clouds.all,
						sunrise: this.state.weatherData.sys.sunrise,
						sunset: this.state.weatherData.sys.sunset,
						wind: {"deg" : this.state.weatherData.wind.deg,
							"speed": (+this.state.weatherData.wind.speed/1.609344).toFixed(2)},
						weather: this.state.weatherData.weather,
						icon: this.state.weatherData.weather[0].icon
					})
				}else if(this.props.error && !this.props.isLoading){
					this.setState({
						weatherData: null
					}, () => {
						this.setState({
							temperature: null,
							humidity: null,
							claudiness: null,
							sunrise: null,
							sunset: null,
							wind: {},
							weather: [],
							icon: null
						})
					})
				}
			})
		}
		if (prevState.isFirstLoad === true && this.state.isFirstLoad === false){
			document.querySelector('.autodetectScreen').classList.add("transparent");
		}
		if (!prevProps.timeWeatherObject && this.props.timeWeatherObject){
			let values = Object.values(this.props.timeWeatherObject);
			let maxTemp = Math.max(...values).toFixed(2);
			let minTemp = (Math.min(...values)-4).toFixed(2);//just to lift it
			let data = this.timeScaleCreator(this.props.timeWeatherObject);
			data.then(time => this.finalObjectConstructor(time, this.props.timeWeatherObject)
			.then(res => {
				this.setState({ 
					oneDayChart: res,
					minTemp,
					maxTemp 
				})
			}));

		}
	}

	timeScaleCreator = async (oneDayChart) => {
		let ams = [];
		let pms = [];
		let keys = Object.keys(oneDayChart);
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
			pms = onlyNumbers.map(value => String(value) + ':00 PM');
		}
		let allTogether = [...ams, ...pms];
		return await allTogether;
	}

	finalObjectConstructor = async (timeArray, oneDayChart) => {
		let sortedData = [];
		for (let i = 0; i<timeArray.length-1; i++){
			let subArray = [];
			subArray[0] = timeArray[i];
			subArray[1] = Number(oneDayChart[timeArray[i]]);
			sortedData.push(subArray);
		}
		return await sortedData;
	}

	calculateTempF = () => {
		return ((((this.state.temperature - 273.15) * 1.8) + 32).toFixed(2));
	}

	calculateTime = (timestamp) => {
		//multiply timestamp by 1000 so that the argument is in milliseconds
		return moment(+timestamp * 1000).format('LT');
		//return (new Date(+timestamp * 1000).toLocaleTimeString("en-US"));
	}

	directionName = (dir) => {
        let q = Number((dir/45).toFixed(2)); //45deg per section
        //let find the whole
        // console.log(q, Math.floor(q));
        if(q > 7) q=1;
        let inx = (Number.isInteger(q) ? q-1 : (Math.floor(q)));
        return (this.state.directionNames[inx]);
    }

    firstLetter = (text) => {
    	let firstLetter = text.slice(0,1);
    	let returnText = firstLetter.toUpperCase()+text.slice(1);
    	return returnText;
    }

    makingObject = async (day) => {
    	let timeWeatherObject = {};
    	day.forEach(value => {
    		let time = value.dt;
    		let timeOfDay = moment(+time * 1000).format('LT');
    		let temp = (((value.main.temp-273.15)*1.8)+32).toFixed(2);
    		timeWeatherObject[timeOfDay] = temp; 
    	})
    	return await timeWeatherObject;
    }

    thisDay = (day) => {
    	let date = day[0].dt_txt.slice(0,10);
    	this.makingObject(day)
		.then(result => {
			// console.log(result);
			this.setState({
				timeWeatherObject: result,
				date: date 
			},()=>{this.props.onTimeWeatherObject(result)});
		})
		.catch(error => this.setState({timeWeatherObject: {}}));
    }



	render(){
		let daily = this.props.timeWeatherObject ? true : false;

		return(
		<div id="weatherWrap">
			<FirstLoadScreen isFirstLoad={this.state.isFirstLoad} />
			{this.props.error && <ErrorScreen isError={this.props.error} />}
			{!this.state.isFirstLoad && !this.props.error && !this.props.geoData && <SearchScreen />}
			{this.props.weatherForecast ? 
				!daily ? 
				<Forecast forecast={this.props.weatherForecast} thisDay={this.thisDay} />
				:
				<ThisDay oneDayChart={this.state.oneDayChart} date={this.state.date} minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} />
			:
			<div>
			<p className="weatherHeadline">{this.state.weather[0] ? this.firstLetter(this.state.weather[0].description) : "Current Weather"}</p>
			<div id="mainBox">
				<div id="parameters">
				<ul>
					<li>Temp: {this.state.temperature && this.calculateTempF()+" F"}</li>
					<li>Humidity: {this.state.humidity && this.state.humidity+" %"}</li>
					<li>Cloudiness: {this.state.claudiness && this.state.claudiness+" %"}</li>
					<li>Sunrise: {this.state.sunrise && this.calculateTime(this.state.sunrise)}</li>
					<li>Sunset: {this.state.sunset && this.calculateTime(this.state.sunset)}</li>
					<li>Wind: {this.state.wind.deg ? this.directionName(this.state.wind.deg)+" "+Math.round(this.state.wind.deg)+"deg": "No Data"}</li>
					<li>Speed: {this.state.wind.speed && this.state.wind.speed + " mph"}</li>
				</ul>
				</div>
				<div id="icon">
					{this.state.icon && <img src={`https://openweathermap.org/img/w/${this.state.icon}.png`} alt="icon" />}
				</div>
			</div>
			</div>}
		</div>
	)
	}
}

const mapStateToProps = (state) => {
	// console.log(state)
	return{
		geoData: state.geoData,
		weatherData: state.weatherData,
		error: state.error,
		isLoading: state.is_Loading,
		autodetect: state.autodetect,
		weatherForecast: state.weatherForecast,
		timeWeatherObject: state.timeWeatherObject
	}
}

const mapDispatchToProps = (dispatch) => {
	return{
		onTimeWeatherObject: (timeWeatherObject) => dispatch(onTimeWeatherObject(timeWeatherObject)),
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(WeatherField);