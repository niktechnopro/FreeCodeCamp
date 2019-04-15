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
		let streets = (this.props.chosenMusic === "streets.mp3");
		let tmnt = (this.props.chosenMusic === "tmnt.mp3");
		let nes = (this.props.chosenMusic === "nes.mp3");

		return(
			<Fragment>
				<div id="displaywrap">
					<input id="display" value={ this.props.stuffToDisplay } disabled />
				</div>
					{this.props.powerOn && <audio 
						ref='audio'
						className="clip" id={this.props.chosenMusic} 
						src={streets ? 'https://s3.amazonaws.com/ciscoscholargmailmusicboxdump/streets.mp3' : (tmnt ? "https://s3.amazonaws.com/ciscoscholargmailmusicboxdump/tmnt.mp3" : (nes ? "https://s3.amazonaws.com/ciscoscholargmailmusicboxdump/nes.mp3" : `./sounds/${this.props.chosenMusic}`))} 
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