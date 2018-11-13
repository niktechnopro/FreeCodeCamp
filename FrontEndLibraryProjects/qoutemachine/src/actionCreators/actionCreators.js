import { POST_A_TWEET, GET_NEW_QUOTE, GET_QUOTES_BLOB_SUCCESS, GET_QUOTES_BLOB_FAILURE } from '../actions/actions';
import axios from 'axios';
const uri = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

export function postTweet(quote){
	//creating a tweet to post
	let postTweet = encodeURIComponent(quote.quote + ' ' + quote.author);
	console.warn(postTweet);

	return{
		type: POST_A_TWEET,
		// payload: 'some tweet'
	}
}

export function getQuote(allquotes){
	//let's generate a number withing the array index
	let index = Math.ceil(Math.random()*100);
	let quote = null;
	try{
		quote = allquotes[index];
	}catch{
		quote = 'something went wrong, try again'
	}
	
	return{
		type: GET_NEW_QUOTE,
		payload: quote
	}
}


export function getQuotesBlob(){
	return (dispatch) => {
 	axios.get(uri)
       .then((response) => {
       	console.log(response)
         dispatch(onGetQuotesBlobSucceeded(response));
    	})
       .catch((error) => {
         dispatch(onGetQuotesBlobFailed(error));
    	});
   };
}

function onGetQuotesBlobSucceeded(response) {
  return{
  	type: GET_QUOTES_BLOB_SUCCESS,
  	payload: response
  }
}

function onGetQuotesBlobFailed(error) {
  return{
  	type: GET_QUOTES_BLOB_FAILURE,
  	payload: error
  }
}
