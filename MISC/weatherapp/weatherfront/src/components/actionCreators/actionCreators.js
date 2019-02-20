import { WEATHER_INFO_FAILURE, WEATHER_INFO_SUCCESS, WEATHER_INFO_START } from '../actions/actions';
import axios from 'axios';
const API = 'http://localhost:8000'
const postUri = API+'/getweather';

//use this to fetch data from url
export function sendCoordinates(address){ 
	return (dispatch) => {
	 dispatch(getWeatherResultsBegined())
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

function getWeatherResultsBegined() {
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
	// console.log('succesful response: ',response)
	return{
		type: WEATHER_INFO_SUCCESS,
		payload: response
	}
}


export function autoDetectCoordinates(latlon){ 
	console.log(latlon);
	return (dispatch) => {
	 // dispatch(getAddressOnAutodetectBegined())
 	return axios.post(postUri, {
	    latlon: latlon
 	})
   .then((response) => {
     // dispatch(getAddressOnAutoDetectSucceeded(response));
	})
   .catch((error) => {
     // dispatch(getAddressOnAutoDetectFailed(error));
	});
   };
}