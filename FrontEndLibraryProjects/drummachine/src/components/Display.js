import React, { Component, Fragment } from "react";

class Display extends Component{
	constructor(){
		super()
		this.state = {
			volume: 100,
			bankChange: false
		}
	}

	volumeChange = (event) => {
		let vol = parseInt(event.target.value * 100);
		if(this.props.powerOn){
			this.setState({
				volume: vol
			})
			this.refs.audio.volume = event.target.value;//controling audio
		}
	}

	bankChange = (event) => {
		// let bank = event.target.value;
		this.setState(function(prevState){
			return{
				bankChange: !prevState.bankChange
			}
		},()=>{
			this.props.bankState(this.state.bankChange);
		})
	}


	render(){
		const goodToPlay = (this.props.chosenMusic === "Activity Indicator") ? false : true; 
		return(
			<Fragment>
				<div id="displaywrap">
					<input id="display" value={ this.props.stuffToDisplay } disabled />
				</div>
					{this.props.powerOn && <audio 
						ref='audio'
						className="clip" id={this.props.chosenMusic} 
						src={goodToPlay ? `https://s3.us-east-2.amazonaws.com/drummachinemusicdump/${this.props.chosenMusic}` : ''}
						type="audio/mp3" 
						autoPlay/
						>}
				<div id="volume">
					<p className="switch-name">Volume</p>
					<div id="volume-level">{this.state.volume}<span>%</span></div>
					<input disabled={!this.props.powerOn} type="range" step="0.01" min="0" max="1" onChange={this.volumeChange} />
				</div>
				<div id="sound-switch">
					<div className="soundswitch">
	    				<input disabled={!this.props.powerOn} type="checkbox" name="soundswitch" className="soundswitch-checkbox" id="soundswitch" onChange={this.bankChange} />
	    				<label className="soundswitch-label" htmlFor="soundswitch">
	        			<span className="soundswitch-inner"></span>
	   		 			</label>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default Display;