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
		return(
			<Fragment>
				<div id="displaywrap">
					<input id="display" value="activity display" disabled />
				</div>
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