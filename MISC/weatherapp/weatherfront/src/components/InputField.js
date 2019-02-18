import React, { Component } from 'react';

class InputField extends Component {
	constructor(){
		super()
		this.state={

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

	handleSubmitButton = (e) => {
		console.log('button clicked', e);
	}

	render(){
		return(
			<div>
				<input id="address" type="text" placeholder="enter location here" />
				<input type="button" value="Find my weather" onClick={this.handleSubmitButton} />
			</div>
		)
	}
}

export default InputField;