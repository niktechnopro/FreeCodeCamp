import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

const FirstLoadScreen = () => {
	return(
		<div id="autodetectScreen">
			<p>Wait Until We detect your location Or Input Location</p>
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
			firstLoad: true
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.firstLoad && prevProps.geoData===null && this.props.geoData && !this.props.error){
			this.setState({
				firstLoad: false
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
	}

	calculateTempF = () => {
		return (((this.state.temperature - 273.15) * 9/5 + 32).toFixed(2));
	}

	calculateTime = (timestamp) => {
		//multiply timestamp by 1000 so that the argument is in milliseconds
		return moment(+timestamp * 1000).format('LT');
		//return (new Date(+timestamp * 1000).toLocaleTimeString("en-US"));
	}

	directionName = (dir) => {
        let q = Number((dir/45).toFixed(2)); //45deg per section
        //let find the whole
        if(q > 7) q=0;
        let inx = (Number.isInteger(q) ? q : (Math.floor(q)+1));
        return (this.state.directionNames[inx]);
    }

    firstLetter = (text) => {
    	let firstLetter = text.slice(0,1);
    	let returnText = firstLetter.toUpperCase()+text.slice(1);
    	return returnText;
    }

	render(){
		console.log(this.props)
		return(
		<div id="weatherWrap">
		{(!this.state.firstLoad && false) ? 
			<div>
			<p id="weatherHeadline">{this.state.weather[0] ? this.firstLetter(this.state.weather[0].description) : "Current Weather"}</p>
			<div id="mainBox">
				<div id="parameters">
				<ul>
					<li>Temp: {this.state.temperature && this.calculateTempF()+" F"}</li>
					<li>Humidity: {this.state.humidity && this.state.humidity+" %"}</li>
					<li>Cloudiness: {this.state.claudiness && this.state.claudiness+" %"}</li>
					<li>Sunrise: {this.state.sunrise && this.calculateTime(this.state.sunrise)}</li>
					<li>Sunset: {this.state.sunset && this.calculateTime(this.state.sunset)}</li>
					<li>Wind: {this.state.wind.deg && this.directionName(this.state.wind.deg)}</li>
					<li>Speed: {this.state.wind.speed && this.state.wind.speed + " mph"}</li>
				</ul>
				</div>
				<div id="icon">
					{this.state.icon && <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="icon" />}
				</div>
			</div>
			</div>
			:
			<FirstLoadScreen />
		}
		</div>
	)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return{
		geoData: state.geoData,
		weatherData: state.weatherData,
		error: state.error,
		isLoading: state.is_Loading,
		autodetect: state.autodetect
	}
}


export default connect(mapStateToProps, null)(WeatherField);