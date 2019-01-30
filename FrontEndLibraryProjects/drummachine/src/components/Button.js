import React from "react";

const Button = (props) => {
	return (
		<button 
			disabled={!props.powerOn} 
			className="drum-pad" 
			onClick={props.buttonClick} 
			>
			{props.purpose}
		</button>
	)
}

export default Button;