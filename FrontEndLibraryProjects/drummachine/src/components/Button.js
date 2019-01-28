import React from "react";

const Button = (props) => {
	return (
		<button className="drum-pad">
			{props.purpose}
		</button>
	)
}

export default Button;