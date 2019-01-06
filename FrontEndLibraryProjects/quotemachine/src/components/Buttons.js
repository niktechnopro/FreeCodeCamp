import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


const Buttons = (props) => {
	return(
		<div id="buttons">
			<button id="tweet-quote" disabled={!props.disabledTweet} onClick={props.tweet}><FontAwesomeIcon
 			    icon={faTwitter}
 			  /> Tweet This</button>
			<button id="new-quote" onClick={props.quote}>Get New Quote</button>
		</div>
	)
}

export default Buttons;