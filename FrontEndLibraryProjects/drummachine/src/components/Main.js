import React, { Component } from "react";
import Button from "./Button";
import Display from "./Display";
import Power from "./Power";


const Buttons = (props) => {
	// const numberOfButtons = new Array(12).fill(0);
	const numberOfButtons = !props.bankState ? 
	['Q','W','E','A','S','D','Z','X','C']
	 : 
	['I','O','P','J','K','L','B','N','M'];
		return (
			numberOfButtons.map((value, index) => 
			<div key={value}><Button purpose = {value} powerOn={props.powerOn} 
				buttonClick={props.handleButtonClick} 
				/>
			</div>
			)
		)
	}


class Main extends Component {
	constructor(){
		super()
		this.state = {
			power: false,
			bankState: false
		}
	}

	componentDidMount = () => {
		this.keyListener = document.addEventListener("keydown", this.handleButtonClick, false);
	}

	componentWillUnmount = () => {
		this.keyListener.remove();
	}

	handleButtonClick = (e) => {
		if(this.state.power && e){
			if(e.type === "keydown"){
				console.log(e.key);
			}else{
				console.log(e.target.textContent.toLowerCase());
			}
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

	bankState = (bankState) => {
		this.setState({
			bankState
		})
	}


	render(){
		return(
			<div id="drum-machine">
				<div className="left-side">
					<Power powerSwitch={this.mainPowerSwitch} />
					<div className="btns">
						{!this.state.power && <div id="btns-cover"></div>}
						<Buttons 
						powerOn={this.state.power} 
						bankState={this.state.bankState} 
						handleButtonClick={this.handleButtonClick}
						/>
					</div>
				</div>
				<div className="right-side">
					<Display powerOn={this.state.power} bankState={this.bankState} />
				</div>
			</div>
		)
	}
}

export default Main;