import React from "react";
import Switch from "./Switch";

const Power = (props) => {
	return(
		<div id="switch-panel">
			<span className="switch-name" style={{color: !props.power ? "#ff0000" : "green" }}>Power</span>
			<Switch powerSwitch={props.powerSwitch} />
		</div>
	)
}

export default Power;