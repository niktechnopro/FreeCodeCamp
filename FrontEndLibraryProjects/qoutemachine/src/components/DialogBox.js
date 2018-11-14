import React, { Component } from 'react';

const DialogBox = (props) => {
	return(
		<div id="modal">
			<h1>{props.error ? props.error : 'Closing'}</h1>
			{!props.blobError && <button onClick={props.close}>Close</button>}
		</div>
	)
} 

export default DialogBox;