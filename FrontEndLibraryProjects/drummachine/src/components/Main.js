import React, { Component, Fragment } from "react";
import Button from "./Button";
import Display from "./Display";
import Power from "./Power";


const Buttons = () => {
	const numberOfButtons = new Array(12).fill(0)
		return (
			Object.keys(numberOfButtons).map((value, index) => <div key={value}><Button purpose = {value} /></div>)
		)
	}


class Main extends Component {
	constructor(){
		super()
		this.state = {
			
		}
	}


	render(){
		return(
			<div id="drum-machine">
				<div className="left-side">
					<Power />
					<div className="btns">
						<Buttons />
					</div>
				</div>
				<div className="right-side">
					<Display />
				</div>
			</div>
		)
	}
}

export default Main;