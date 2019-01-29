import React, { Component } from "react";
import Button from "./Button";
import Display from "./Display";
import Power from "./Power";


const Buttons = (props) => {
	// const numberOfButtons = new Array(12).fill(0);
	const numberOfButtons = ['Q','W','E','R','A','S','D','F','Z','X','C','V'];
		return (
			numberOfButtons.map((value, index) => <div key={value}><Button purpose = {value} powerOn={props.powerOn} buttonClick={(e)=>console.log(e.target.textContent)} /></div>)
		)
	}


class Main extends Component {
	constructor(){
		super()
		this.state = {
			power: false
		}
	}

	mainPowerSwitch = (event) => {
		// let power = event.target.value;
		this.setState(function(prevState){
			return{
				power: !prevState.power
			}
		})
	}


	render(){
		return(
			<div id="drum-machine">
				<div className="left-side">
					<Power powerSwitch={this.mainPowerSwitch} />
					<div className="btns">
						{!this.state.power && <div id="btns-cover"></div>}
						<Buttons powerOn={this.state.power} />
					</div>
				</div>
				<div className="right-side">
					<Display powerOn={this.state.power} />
				</div>
			</div>
		)
	}
}

export default Main;