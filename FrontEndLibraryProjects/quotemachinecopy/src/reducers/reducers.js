import { POST_A_TWEET, GET_NEW_QUOTE, 
	GET_QUOTES_BLOB_SUCCESS, 
	GET_QUOTES_BLOB_FAILURE,
	TWEET_ERROR,
	TWEET_SUCCESS,
	CLEAR_ERROR } from '../actions/actions';

const initialState = {
	tweet: '',
	quote: '',
	allquotes: [],
	error: null,
	blobError: null
}

export default (state=initialState, action) => {
	// console.warn('from reducer', state, action);
	switch(action.type){
		case POST_A_TWEET:
			return {
				...state,
				tweet: action.payload
			};
		case GET_NEW_QUOTE:
			return {
				...state,
				quote: action.payload,
				error: null,
				blobError: null
			};
		case GET_QUOTES_BLOB_SUCCESS:
			return {
				...state,
				allquotes: action.payload.data.quotes
			};
		case GET_QUOTES_BLOB_FAILURE:
			return {
				...state,
				error: action.payload,
				blobError: true
			};
		case TWEET_SUCCESS:
			return{
				...state,
				tweet: action.payload
			};
		case TWEET_ERROR:
			return{
				...state,
				error: action.payload
			};
		case CLEAR_ERROR:
			return{
				...state,
				error: null,
				blobError: null
			}
		default:
			return state;
	}
}