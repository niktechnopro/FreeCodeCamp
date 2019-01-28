import React from "react";

const Switch = (props) => {
	return(
		<div id="switch">
			<div className="onoffswitch">
	    		<input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" />
	    	<label className="onoffswitch-label" for="myonoffswitch">
	        	<span className="onoffswitch-inner"></span>
	        	<span className="onoffswitch-switch"></span>
	   		 </label>
			</div>
		</div>
	)
}

export default Switch;