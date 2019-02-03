import React, { Component } from "react";
import Button from "./Button";
import Display from "./Display";
import Power from "./Power";


//this is Buttons component
const Buttons = (props) => {
		return (
			props.chosenBank.map((value, index) => 
			<div key={value}
			><Button 
				purpose = {value} 
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
			chosenMusic: 'Activity Indicator'
		}
	}

	componentDidMount = () => {
		this.keyListenerDown = document.addEventListener("keydown", this.handleButtonClick, false);
		this.keyListenerUp = document.addEventListener("keyup", this.handleButtonUp, false);
	}

	componentWillUnmount = () => {
		this.keyListenerUp.remove();
		this.keyListenerDown.remove();
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (prevState.power === true && prevState.power !== this.state.power){
			this.setState({
				pressedKey: '',
				chosenMusic: 'Activity Indicator'
			})
		}
	}

	handleButtonUp = (e) => {
		if(this.state.power && e && e.type === "keyup"){
			if(this.state.chosenBank.includes(e.key.toUpperCase())){
				//remove the class to imitate the keyrelease
				this.drumPad.classList.remove("classToAdd");
			}
		}
	}

	handleButtonClick = (e) => {
		// console.log(e)
		let pressedKey = null;
		if(this.state.power && e){
			if(e.type === "keydown"){
				pressedKey = e.key.toUpperCase();
				if(pressedKey && this.state.chosenBank.includes(pressedKey)){
					this.drumPad = document.querySelector(`#${pressedKey}`);
					this.drumPad.classList.add("classToAdd");
				}
			}else{
				pressedKey = e.target.textContent;
			}
			if (this.state.chosenBank.includes(pressedKey)){
				this.setState(function(prevState){
					if (prevState.pressedKey !== pressedKey){
						return{
							pressedKey
						}
					}else{
						return{
							chosenMusic: 'Activity Indicator'
						}
					}
				},()=>{
					this.onButtonPress(pressedKey);
				})
			}	
		}
	}

	onButtonPress = (pressedKey) => {//this is where music chosen
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
			'O' : "tuba.mp3",
			'P' : "viola.mp3",
			'J' : "violin.mp3",
			'K' : "tmnt.mp3",
			'L' : "sor.mp3",
			'B' : "lords.mp3",
			'N' : "streets.mp3",
			'M' : "nes.mp3"
		}
		let chosenMusic = buttonsToMusic[pressedKey];
		this.setState({
			chosenMusic
		})
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
		let chosenBank = !bankState ? 
		['Q','W','E','A','S','D','Z','X','C']
		 : 
		['I','O','P','J','K','L','B','N','M'];
		this.setState({
			chosenBank
		})
	}


	render(){
		return(
			<div id="drum-machine">
				<div className="left-side">
					<Power powerSwitch={this.mainPowerSwitch} power={this.state.power} />
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
					<Display
					stuffToDisplay={this.state.power ? this.state.chosenMusic : "Power Off"}
					chosenMusic={this.state.chosenMusic} 
					powerOn={this.state.power} 
					bankState={this.bankState} />
				</div>
			</div>
		)
	}
}

export default Main;