import { WEATHER_INFO_FAILURE, WEATHER_INFO_SUCCESS, WEATHER_INFO_START,
	AUTO_INFO_SUCCESS, AUTO_INFO_FAILURE, AUTO_INFO_START, IP_ADDRESS_LOOKUP
 } from '../actions/actions';
import axios from 'axios';
const API = 'http://localhost:8000'
const postUri = API+'/getweather';
const postUriLatLon = API+'/basedOnLatLon';
const ipAddressLookupAPI = 'http://ip-api.com/json';


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
	// console.log('succesful response: ',response)
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

export function ipAddressLookup(){ 
	return (dispatch) => {
	 dispatch(autoResultsBegin())
 	return axios.get(ipAddressLookupAPI)    
	   .then((response) => {
	   	if(response.status === 200){
	   		let respObject = response.data;
	   		let latlng={
	   			latitude: respObject.lat,
	   			longitude: respObject.lon,
	   			accuracy: 20
	   		}
	     dispatch(ipAddressLookupSuccess(latlng));
	     	return latlng;
	     }
		})
	   .catch((error) => {
	   		console.log(error)
	   		dispatch(autoResultsFailed(error));
		});
    };
}


function ipAddressLookupSuccess(latlng){
	return{
		type: IP_ADDRESS_LOOKUP,
		payload: latlng
	}
}