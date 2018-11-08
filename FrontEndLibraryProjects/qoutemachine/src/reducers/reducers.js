const initialState = {
	tweet: 'initial tweet',
	quote: 'initial quote'
}

export const reducers = (state=initialState, action){
	console.warn('from reducer', state, action);
	switch(action.type){
		case GET_A_TWEET:
			return {
				tweet: 'new_tweet'
			};
		case GET_NEW_QUOTE:
			return {
				quote: 'new_qoute'
			};
		default:
			return state;
	}
}