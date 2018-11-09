import { GET_A_TWEET, GET_NEW_QUOTE, GET_QUOTES_BLOB_SUCCESS, GET_QUOTES_BLOB_FAILURE } from '../actions/actions';

const initialState = {
	tweet: '',
	quote: '',
	allquotes: [],
	error: null
}

export default (state=initialState, action) => {
	console.warn('from reducer', state, action);
	switch(action.type){
		case GET_A_TWEET:
			return {
				tweet: action.payload
			};
		case GET_NEW_QUOTE:
			return {
				quote: action.payload
			};
		case GET_QUOTES_BLOB_SUCCESS:
			return {
				...state,
				allquotes: action.payload.data.quotes
			}
		case GET_QUOTES_BLOB_FAILURE:
			return {
				...state,
				error: action.payload.message
			}
		default:
			return state;
	}
}