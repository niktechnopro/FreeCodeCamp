import React from 'react';


const Buttons = (props) => {
	return(
		<div id="buttons">
			<button id="tweet-quote" onClick={props.tweet}>Tweet this quote</button>
			<button id="new-quote" onClick={props.quote}>Get new quote</button>
		</div>
	)
}

export default Buttons;