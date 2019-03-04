import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCoordinates, autoDetectCoordinates } from './actionCreators/actionCreators';

class InputField extends Component {
	constructor(){
		super()
		this.state={
			address: '',
			focus: false,
		}
		this.keyListener = null;
	}

	componentDidUpdate = (prevProps) => {

	}

	componentDidMount = () => {
		//let's find user's location
		this.keyDownListener = document.addEventListener("keydown", this.buttonHandler);
		this.keyUpListener = document.addEventListener("keyup", this.buttonUp);
		navigator.geolocation.getCurrentPosition(coordinates => {
			let latlng = coordinates.coords;
			//we have to send to to node API for processing
			this.props.onAutoDetectCoordinates(latlng);
		});
		this.searchButton = document.querySelector('[type="button"]');
	}

	componentWillUnmount = () => {
		this.keyDownListener.remove();
		this.keyDownListener = null;
		this.keyUpListener.remove();
		this.keyUpListener = null;
	}

	buttonHandler = (e) => {
		if(e.keyCode === 13 && this.state.address.length > 4){
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
		this.setState({
			focus: true
		})
	}

	render(){
		let happening = this.props.autodetect ? 
		<p>Detecting your Location...</p>
		:
		<p>Address That We Found:</p>;

		let errorDetection = this.props.error ? <p>Try again...</p> : happening;
		// console.log(this.props);
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
					<input type="button" 
						value="Find my weather" 
						onClick={this.handleSubmitButton} 
					/>
				</section>
				{!this.state.focus && <section is="sectionBottom">
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
	console.log('data', state);
	return{
		geoData: state.geoData,
		autodetect: state.autodetect,
		is_Loading: state.is_Loading,
		error: state.error
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSendCoordinates: (coordinates) => dispatch(sendCoordinates(coordinates)),
		onAutoDetectCoordinates: (latlng) => dispatch(autoDetectCoordinates(latlng))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);