import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendCoordinates } from './actionCreators/actionCreators';

class InputField extends Component {
	constructor(){
		super()
		this.state={
			address: ''
		}
	}

	componentDidMount = () => {
		console.log("component did mount");
		//let's find user's location
		navigator.geolocation.getCurrentPosition(coordinates => {
			let latlon = coordinates.coords;
			console.log(latlon);
			//we have to send to to node API for processing
		});
	}

	handleInput = (e) => {
		let address = e.target.value;
		this.setState({address});
	}

	handleSubmitButton = (e) => {
		e.preventDefault();
		//send coordinates to NODE API
		this.props.onSendCoordinates(this.state.address);
	}

	render(){
		return(
			<div>
				<input id="address" type="text" placeholder="enter location here" onChange={this.handleInput} />
				<input type="button" value="Find my weather" onClick={this.handleSubmitButton} />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
	return{
		allstates: state
	}
	
}

const mapDispatchToProps = (dispatch) => {
	return {
		onSendCoordinates: (coordinates) => dispatch(sendCoordinates(coordinates)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InputField);