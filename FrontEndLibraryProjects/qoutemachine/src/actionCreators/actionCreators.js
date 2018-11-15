import { GET_NEW_QUOTE, 
		GET_QUOTES_BLOB_SUCCESS, GET_QUOTES_BLOB_FAILURE,
		TWEET_ERROR, TWEET_SUCCESS,
		CLEAR_ERROR } from '../actions/actions';
// import axios from 'axios';
import data from './quotesBlob';
// const uri = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

export function postTweet(quote){
	//creating a tweet to post
	let postTweet = encodeURIComponent(quote.quote + ' ' + quote.author);
	let tweet = quote.quote + ' ' + quote.author;
	let url = 'http://twitter.com/home?status=';
	// console.log(tweet.length);
	if (tweet.length <= 140 ){//checking if the tweet is shorter than 140 characters
		window.open(url+postTweet, '_blank');
		return (dispatch) => {dispatch(tweetIsSuccess(tweet))}
	}else{
		return (dispatch) => {dispatch(tweetIsTooLong())}
	}	
}


export function getQuote(allquotes){
	//let's generate a number withing the array index
	let index = Math.ceil(Math.random()*100);
	let quote = null;
	try{
		quote = allquotes[index];
	}catch{
		quote = 'Something went wrong, please refresh the page or comeback later'
	}
	
	return{
		type: GET_NEW_QUOTE,
		payload: quote
	}
}

export function clearError(){
	return{
		type: CLEAR_ERROR
	}
}

// use this to fetch data from url
// export function getQuotesBlob(){ 
// 	return (dispatch) => {
//  	axios.get(uri)
//        .then((response) => {
//          dispatch(onGetQuotesBlobSucceeded(response));
//     	})
//        .catch((error) => {
//          dispatch(onGetQuotesBlobFailed(error));
//     	});
//    };
// }

export function getQuotesBlob(){
	return (dispatch) => dispatch(onGetQuotesBlobSucceeded(data));
}

function onGetQuotesBlobSucceeded(response) {
	// console.log(response)
	//the following is to download file
	// let a = document.createElement("a");
 //    let file = new Blob([response.data.quotes], {type: "application/json"});
 //    a.href = URL.createObjectURL(file);
 //    a.download = 'jsonBlob.json';
 //    a.click();
    //the above is to download file
	return{
		type: GET_QUOTES_BLOB_SUCCESS,
		payload: response
	}
}

// function onGetQuotesBlobFailed(error) {
// 	return{
// 		type: GET_QUOTES_BLOB_FAILURE,
// 		payload: 'Oops, could not retrieve the quotes, please try again later'
// 	}
// }

function tweetIsTooLong(){
	return{
		type: TWEET_ERROR,
		payload: 'Quote must be 140 characters or less, refresh the page or press the button to Get New Quote'
	}
}

function tweetIsSuccess(tweet){
	return{
		type: TWEET_SUCCESS,
		payload: tweet
	}
}
