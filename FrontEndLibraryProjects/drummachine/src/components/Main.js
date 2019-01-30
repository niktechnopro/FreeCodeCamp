import React, { Component } from "react";
import Button from "./Button";
import Display from "./Display";
import Power from "./Power";


//this is Buttons component
const Buttons = (props) => {
		return (
			props.chosenBank.map((value, index) => 
			<div key={value}><Button purpose = {value} 
				powerOn={props.powerOn} 
				buttonClick={props.handleButtonClick} 
				/>
			</div>
			)
		)
	}
//this is Buttons component end

class Main extends Component {
	constructor(){
		super()
		this.state = {
			power: false,
			pressedKey: '',
			chosenBank: ['Q','W','E','A','S','D','Z','X','C']
		}
	}

	componentDidMount = () => {
		this.keyListener = document.addEventListener("keydown", this.handleButtonClick, false);
	}

	componentWillUnmount = () => {
		this.keyListener.remove();
	}

	handleButtonClick = (e) => {
		let pressedKey = null;
		if(this.state.power && e){
			if(e.type === "keydown"){
				pressedKey = e.key.toUpperCase();
			}else{
				pressedKey = e.target.textContent;
			}
		}
		if(pressedKey && this.state.chosenBank.includes(pressedKey)){
			this.setState({
				pressedKey
			},()=>{
				//logic to handle keyPress
				this.onButtonPress();
			})
		}
	}

	onButtonPress = () => {//this is where music chosen
		console.log(this.state.pressedKey);
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
		console.log(bankState)
		let chosenBank = !bankState ? 
		['Q','W','E','A','S','D','Z','X','C']
		 : 
		['I','O','P','J','K','L','B','N','M'];
		this.setState({
			chosenBank
		})
	}


	render(){
		console.log('state', this.state);
		return(
			<div id="drum-machine">
				<div className="left-side">
					<Power powerSwitch={this.mainPowerSwitch} />
					<div className="btns">
						{!this.state.power && <div id="btns-cover"></div>}
						<Buttons 
						powerOn={this.state.power} 
						handleButtonClick={this.handleButtonClick}
						chosenBank={this.state.chosenBank}
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