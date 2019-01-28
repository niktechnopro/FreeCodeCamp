import React from "react";
import Switch from "./Switch";

const Power = (props) => {
	return(
		<div id="switch-panel">
			<span className="switch-name">Power</span>
			<Switch powerSwitch={props.powerSwitch} />
		</div>
	)
}

export default Power;