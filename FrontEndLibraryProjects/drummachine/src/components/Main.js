import React, { Component, Fragment } from "react";
import Button from "./Button";

const Buttons = () => {
	const numberOfButtons = new Array(9).fill(0)
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
			<Fragment>
				<div className="btns">
					<Buttons />
				</div>
			</Fragment>
		)
	}
}

export default Main;