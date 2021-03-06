import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCoordinates, 
		autoDetectCoordinates,
		ipAddressLookup,
		getForecast,
		onTimeWeatherObject,
		testRequest } from './actionCreators/actionCreators';


class InputField extends Component {
	constructor(){
		super()
		this.state={
			address: '',
			focus: false,
			isFirstLoad: true
		}
		this.keyListener = null;
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(this.state.isFirstLoad && prevProps.autodetect && !this.props.autodetect){
			this.setState({
				isFirstLoad: false
			})
		}
	}

	ipLookupAddress = () => {
		// this.props.fetchIpAddess();
		return this.props.onIPaddressLookup();
	}

	componentDidMount = () => {
		//mounting keyEventListeners
		this.keyDownListener = document.addEventListener("keydown", this.buttonHandler);
		this.keyUpListener = document.addEventListener("keyup", this.buttonUp);
		//let's find user's location
		if(navigator && navigator.geolocation){//alternatively "geolocation" in navigator
			navigator.geolocation.getCurrentPosition((coordinates, error) => {
				if(coordinates){
					let latlng = coordinates.coords;
					//we have to send to to node API for processing
					this.props.onAutoDetectCoordinates(latlng);
				}else{
					//let's tru IP lookup Address
					this.ipLookupAddress().then(res => {
						if(res){
							this.props.onAutoDetectCoordinates(res);
						}
					});
				}
			});
		}
		this.searchButton = document.querySelector('[type="button"]');
	}

	componentWillUnmount = () => {
		this.keyDownListener.remove();
		this.keyDownListener = null;
		this.keyUpListener.remove();
		this.keyUpListener = null;
	}

	buttonHandler = (e) => {
		if(e.keyCode === 13 && this.state.address.length > 0){
			this.searchButton.classList.add("classToAdd");
			this.setState({
				focus: false
			})	
			this.props.onSendCoordinates(this.state.address)
			.then(result => {
				this.setState({
					address: ""
				})
			});
		}
	}

	buttonUp = (e) => {
		if(e.keyCode === 13){
			this.searchButton.classList.remove("classToAdd");
		}
	}

	handleInput = (e) => {
		let address = e.target.value;
		this.setState({address});
	}

	handleSubmitButton = (e) => {
		e.preventDefault();
		this.setState({
			focus: false
		})
		this.props.onSendCoordinates(this.state.address)
		.then(result => {
			this.setState({
				address: ""
			})
		});
	}

	onFocusClear = (e) => {
		if(!this.state.isFirstLoad || !this.props.autodetect || !this.props.is_Loading){
			this.setState({
				focus: true
			})
		}
	}

	forecastWeather = () => {
		this.props.onGetForecast(this.props.geoResults);
	}

	resetTimeWeatherObject = () => {
		this.props.onTimeWeatherObject(null);
	}

	render(){
		const {timeWeatherObject} = this.props;
		let happening = this.state.isFirstLoad || this.props.autodetect ? 
		<p>Detecting your Location...</p>
		:
		<p>Address That We Found:</p>;

		let errorDetection = this.props.error ? <p>Try again...</p> : happening;
		let forecastButton = !this.props.error && !this.state.focus && this.props.geoData && !this.props.weatherForecast;
		let timeWeather = (!this.state.focus) && timeWeatherObject ? true : false;

		return(
			<div id="inputAreaWrapper">
				<section id="sectionTop">
					<input id="address" 
						type="text" 
						placeholder="enter location here" 
						onChange={this.handleInput} 
						value={this.state.address}
						onFocus={this.onFocusClear}
					/>
				</section>
				<section id="sectionMiddle">
					<input 
						type={forecastButton ? "forecastBTN" : "button"} 
						value={forecastButton ? "5 Days Forecast" : timeWeather ? "Back to 5 days forecast" : "Find my weather"} 
						onClick={forecastButton ? this.forecastWeather : timeWeather ? this.resetTimeWeatherObject : this.handleSubmitButton} 
					/>
				</section>
				{(!this.state.focus || timeWeatherObject) && <section is="sectionBottom">
					<div id="response">
					{(!this.props.is_Loading || this.props.autodetect) ? errorDetection : <p>Searching...</p>}
					{this.props.geoData ? <p>{this.props.geoData}</p> : <p />}
					</div>
				</section>}
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	// console.log("state: ", state);
	return{
		geoData: state.geoData,
		autodetect: state.autodetect,
		is_Loading: state.is_Loading,
		error: state.error,
		latlng: state.latlng,
		geoResults: state.geoResults,
		weatherForecast: state.weatherForecast,
		timeWeatherObject: state.timeWeatherObject
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSendCoordinates: (coordinates) => dispatch(sendCoordinates(coordinates)),
		onAutoDetectCoordinates: (latlng) => dispatch(autoDetectCoordinates(latlng)),
		onIPaddressLookup: () => dispatch(ipAddressLookup()),
		onGetForecast: (geoResults) => dispatch(getForecast(geoResults)),
		onTimeWeatherObject: (timeWeatherObject) => dispatch(onTimeWeatherObject(timeWeatherObject)),
		onTestRequest: (crap) => dispatch(testRequest(crap))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);