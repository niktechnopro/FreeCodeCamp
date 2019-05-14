import { WEATHER_INFO_FAILURE, WEATHER_INFO_SUCCESS, WEATHER_INFO_START,
	AUTO_INFO_SUCCESS, AUTO_INFO_FAILURE, AUTO_INFO_START, IP_ADDRESS_LOOKUP,
	GET_FORECAST_BEGIN, GET_FORECAST_SUCCESS, GET_FORECAST_FAILED, SET_WEATHER_GRAPH_DATA
 } from '../actions/actions';
import axios from 'axios';
// const API = 'http://localhost:8000';
const API = 'https://wapi.niktechnopro.com';
const postUri = API+'/getweather';
const postUriLatLon = API+'/basedOnLatLon';
const ipAddressLookupAPI = 'http://ip-api.com/json';
const getWeatherForecastAPI = API+'/forecast';


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


export function getForecast(latlng){
	return (dispatch) => {
	 dispatch(getForecastBegin())
 	return axios.post(getWeatherForecastAPI,{
	    latlng: latlng 
 	})    
	   .then((response) => {
	   		if(response.status === 200){
	   			let respObject = response.data.weatherData;
	   			dispatch(getForecastSuccess(respObject));
	     	}else{
	     		dispatch(getForecastFailed("wrong status code"));
	     	}
		})
	   .catch((error) => {
	   		dispatch(getForecastFailed(error));
		});
    };	
}


function getForecastBegin(){
	return{
		type: GET_FORECAST_BEGIN
	}
}

function getForecastSuccess(respObject){
	return{
		type: GET_FORECAST_SUCCESS,
		payload: respObject
	}
}

function getForecastFailed(error){
	return{
		type: GET_FORECAST_FAILED,
		payload: error
	}
}

export function onTimeWeatherObject(timeWeatherObject){
	return{
		type: SET_WEATHER_GRAPH_DATA,
		payload: timeWeatherObject
	}
}

