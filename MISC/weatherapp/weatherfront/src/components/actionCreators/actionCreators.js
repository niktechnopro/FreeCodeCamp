import { WEATHER_INFO_FAILURE, WEATHER_INFO_SUCCESS, WEATHER_INFO_START,
	AUTO_INFO_SUCCESS, AUTO_INFO_FAILURE, AUTO_INFO_START
 } from '../actions/actions';
import axios from 'axios';
const API = 'http://localhost:8000'
const postUri = API+'/getweather';
const postUriLatLon = API+'/basedOnLatLon';


//use this to fetch data from url
export function sendCoordinates(address){ 
	return (dispatch) => {
	 dispatch(getWeatherResultsBegin())
 	return axios.post(postUri, {
	    address: address
 	})
   .then((response) => {
     dispatch(getWeatherResultsSucceeded(response));
	})
   .catch((error) => {
     dispatch(getWeatherResultsFailed(error));
	});
   };
}

function getWeatherResultsBegin() {
	return{
		type: WEATHER_INFO_START
	}
}


function getWeatherResultsFailed(error) {
	return{
		type: WEATHER_INFO_FAILURE,
		payload: 'error'
	}
}

function getWeatherResultsSucceeded(response) {
	console.log('succesful response: ',response)
	return{
		type: WEATHER_INFO_SUCCESS,
		payload: response
	}
}


export function autoDetectCoordinates(latlng){ 
	return (dispatch) => {
	 dispatch(autoResultsBegin())
 	return axios.post(postUriLatLon, {
	    latlng: {lat : latlng.latitude, lng: latlng.longitude, accuracy: latlng.accuracy} 
 	})
   .then((response) => {
     dispatch(autoResultsSucceeded(response));
	})
   .catch((error) => {
     dispatch(autoResultsFailed(error));
	});
   };
}

function autoResultsBegin() {
	return{
		type: AUTO_INFO_START
	}
}


function autoResultsSucceeded(response) {
	// console.log('succesful response: ',response)
	return{
		type: AUTO_INFO_SUCCESS,
		payload: response
	}
}


function autoResultsFailed(error) {
	return{
		type: AUTO_INFO_FAILURE,
		payload: 'error'
	}
}