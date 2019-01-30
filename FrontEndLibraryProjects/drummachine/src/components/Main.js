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
			chosenBank: ['Q','W','E','A','S','D','Z','X','C'],
			chosenMusic: ''
		}
	}

	componentDidMount = () => {
		this.keyListener = document.addEventListener("keydown", this.handleButtonClick, false);
	}

	componentWillUnmount = () => {
		this.keyListener.remove();
	}

	componentDidUpdate = (prevProps, prevState) => {
		console.log(prevState, this.state)
		if (prevState.power === true && prevState.power !== this.state.power){
			console.log("power button turned off");
		}
		if (prevState.chosenMusic !== this.state.chosenMusic){
			console.log("new tune");
		}
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
		let buttonsToMusic = {
			'Q' : "baritone.mp3",
			'W' : "bass.mp3",
			'E' : "bells.mp3",
			'A' : "cello.mp3",
			'S' : "clarinet.mp3",
			'D' : "flute.mp3",
			'Z' : "horn.mp3",
			'X' : "sax.mp3",
			'C' : "snare.mp3",
			'I' : "trombone.mp3",
			'O' : "tube.mp3",
			'P' : "viola.mp3",
			'J' : "violin.mp3",
			'K' : "blank",
			'L' : "blank",
			'B' : "blank",
			'N' : "blank",
			'M' : "blank"
		}
		let chosenMusic = buttonsToMusic[this.state.pressedKey];
		this.setState({
			chosenMusic
		})
		// let audio = new Audio(`sounds/${chosenMusic}`);
		// console.log(audio);
		// audio.play()
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