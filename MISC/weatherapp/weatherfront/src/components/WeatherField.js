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
			wind: {}
		}
	}

	componentDidUpdate = (prevState) => {
		if(this.state.weatherData === null || this.props.weatherData !== prevState.weatherData){
			this.setState({
				weatherData: this.props.weatherData
			},()=>{
				if(this.props.weatherData && this.props.weatherData.main){
					this.setState({
						temperature: this.props.weatherData.main.temp,
						humidity: this.props.weatherData.main.humidity,
						claudiness: this.props.weatherData.clouds.all,
						sunrise: this.props.weatherData.sys.sunrise,
						sunset: this.props.weatherData.sys.sunset,
						wind: {"deg" : this.props.weatherData.wind.deg,
							"speed": this.props.weatherData.wind.speed}
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

	// directionName = (dir) => {
 //        let sections = this.state.directionNames.length,
 //        let sect = 360 / sections,
 //        let x = Math.floor((dir + sect / 2) / sect);
 //        let y = (x >= sections) ? 0 : x;

 //        console.log(this.state.directionNames[y]);
 //    }

	render(){
		console.log(this.state);
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
				<li>Wind: {this.state.wind}</li>
			</ul>
			</div>
		</div>
	)
	}
}

const mapStateToProps = (state) => {
	console.log(state)
	return{
		weatherData: state.weatherData,
	}
}


export default connect(mapStateToProps, null)(WeatherField);