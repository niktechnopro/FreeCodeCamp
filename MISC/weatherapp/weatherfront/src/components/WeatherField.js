import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";



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
			icon: null
		}
	}

	componentDidUpdate = (prevState) => {
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
        let sections = this.state.directionNames.length,
        sect = 360 / sections; //how many degrees per section
        let x = dir / sect;
        let y = (x >= sections) ? 0 : Math.round(x),//if whole number - single direction
        idx = (Number.isInteger(x)) ? y : y+1;//if not whole number - next direction
        return (this.state.directionNames[idx]);
    }

	render(){
		return(
		<div id="weatherWrap">
			<p>Current Weather</p>
			<div>
			<ul>
				<li>Temp: {this.state.temperature && this.calculateTempF()+" F"}</li>
				<li>Humidity: {this.state.humidity && this.state.humidity+" %"}</li>
				<li>Cloudiness: {this.state.claudiness && this.state.claudiness+" %"}</li>
				<li>Sunrise: {this.state.sunrise && this.calculateTime(this.state.sunrise)}</li>
				<li>Sunset: {this.state.sunset && this.calculateTime(this.state.sunset)}</li>
				<li>Wind: {this.state.wind.deg && this.directionName(this.state.wind.deg)}</li>
				<li>Speed: {this.state.wind.speed && this.state.wind.speed + " mph"}</li>
				<li>Weather: {this.state.weather[0] && this.state.weather[0].description}</li>
			</ul>
			</div>
			{this.state.icon && <img src={`http://openweathermap.org/img/w/${this.state.icon}.png`} alt="icon" />}
		</div>
	)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return{
		weatherData: state.weatherData,
		error: state.error,
		isLoading: state.is_Loading
	}
}


export default connect(mapStateToProps, null)(WeatherField);