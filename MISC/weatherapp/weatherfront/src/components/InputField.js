import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCoordinates, autoDetectCoordinates } from './actionCreators/actionCreators';

class InputField extends Component {
	constructor(){
		super()
		this.state={
			address: ''
		}
		this.keyListener = null;
	}

	componentDidUpdate = (prevProps) => {

	}

	componentDidMount = () => {
		//let's find user's location
		this.keyListener = document.addEventListener("keydown", this.buttonHandler);
		navigator.geolocation.getCurrentPosition(coordinates => {
			let latlng = coordinates.coords;
			//we have to send to to node API for processing
			this.props.onAutoDetectCoordinates(latlng);
		});
	}

	componentWillUnmount = () => {
		this.keyListener.remove();
		this.keyListener = null;
	}

	buttonHandler = (e) => {
		if(e.keyCode === 13 && this.state.address.length > 4){
			this.props.onSendCoordinates(this.state.address)
			.then(result => {
				this.setState({
					address: ""
				})
			});
		}
	}

	handleInput = (e) => {
		let address = e.target.value;
		this.setState({address});
	}

	handleSubmitButton = (e) => {
		e.preventDefault();
		this.props.onSendCoordinates(this.state.address)
		.then(result => {
			this.setState({
				address: ""
			})
		});

	}

	render(){
		// console.log(this.props);
		return(
			<div id="inputAreaWrapper">
				<section id="sectionTop">
					<input id="address" 
						type="text" 
						placeholder="enter location here" 
						onChange={this.handleInput} 
						value={this.state.address}
					/>
				</section>
				<section id="sectionMiddle">
					<input type="button" 
						value="Find my weather" 
						onClick={this.handleSubmitButton} 
					/>
				</section>
				<section is="sectionBottom">
					<div id="response">
					{!this.props.is_Loading ? <p>based on your input we found:</p> : <p>Searching...</p>}
					{this.props.geoData ? <p>{this.props.geoData}</p> : <p />}
					</div>
				</section>
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return{
		geoData: state.geoData,
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSendCoordinates: (coordinates) => dispatch(sendCoordinates(coordinates)),
		onAutoDetectCoordinates: (latlng) => dispatch(autoDetectCoordinates(latlng))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);