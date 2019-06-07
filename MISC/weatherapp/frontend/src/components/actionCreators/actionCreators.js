import { WEATHER_INFO_FAILURE, WEATHER_INFO_SUCCESS, WEATHER_INFO_START,
	AUTO_INFO_SUCCESS, AUTO_INFO_FAILURE, AUTO_INFO_START, IP_ADDRESS_LOOKUP,
	GET_FORECAST_BEGIN, GET_FORECAST_SUCCESS, GET_FORECAST_FAILED, SET_WEATHER_GRAPH_DATA
 } from '../actions/actions';
import axios from 'axios';
let retryCount = 0;
// import axiosRetry from 'axios-retry';


const API = 'http://localhost:8000';
// const API = 'https://wapi.niktechnopro.com';
const ipAddressLookupAPI = 'http://ip-api.com/json';
// let globalDispatch;

const weatherAxios = axios.create({
	baseURL: API,
	headers: {
		"Content-Type" : "application/json",
		'Accept': 'application/json'
	}
})


const testAxios = axios.create({
	baseURL: API,
	headers: {
		"Content-Type" : "application/json",
	},
})


export function testRequest(crap){
	console.log("inside testRequest function")
	return(dispatch) => {
		// globalDispatch = dispatch;
		return testAxios({
			url: '/test',
			method: 'post',
			data: {data: crap}
		})
	}
}

//interceptors
testAxios.interceptors.request.use(
    request => {
    console.log("request success: ", request)
    request.retries = 3;
    request.retryDelay = 3000;
    return request;
    }, error => {
    console.log("request error: ", error)
    return error;
});
    
testAxios.interceptors.response.use(
	response=>{
		retryCount = 0;
		console.log("response: ", response)
		return response
	}, 
	(error) => {
		console.log("error: ", error.response.config)
		let config = error.config;
	    // If config does not exist or the retry option is not set, reject
	    if(!config || !config.retries) return Promise.reject(error);
	    
	    // Check if we've maxed out the total number of retries
	    if(retryCount >= config.retries) {
	        // Reject with the error
	        retryCount = 0;
	        return Promise.reject(error);
	    }
	    
	    // Increase the retry count
	    retryCount += 1;
	    console.log(retryCount, config.retryDelay * retryCount);
	    
	    // Create new promise to handle exponential backoff
	    let backoff = new Promise(function(resolve) {
	        setTimeout(function() {
	            resolve();
	        }, config.retryDelay*retryCount || 1);
	    });
	    
	    // Return the promise in which recalls axios to retry the request
	    return backoff.then(function() {
	        return testAxios(config);
		});
	}
);




//use this to fetch data from url
export function sendCoordinates(address){ 
	return (dispatch) => {
		 dispatch(getWeatherResultsBegin())
	 	return weatherAxios.post("/getweather", {
		    address: address
	 	})
	   .then((response) => {
	     	dispatch(getWeatherResultsSucceeded(response));
		})
	   .catch((error) => {
	   		console.log(error.message, error.response, error.response.status)
	     	dispatch(getWeatherResultsFailed(error.message));
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
 	return weatherAxios.post("/basedOnLatLon", {
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
 	return weatherAxios.post("/forecast",{
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


// this works with continues re-call for faile method
// export function testRequest(crap){
// 	console.log("inside testRequest function")
// 	return(dispatch) => {
// 		globalDispatch = dispatch;
// 		return testAxios.post("/test",
// 			{data: crap}
// 		)
// 	}
// }

// //interceptors
// testAxios.interceptors.request.use(
//     request => {
//     console.log("request success: ", request)
//     return request;
//     }, error => {
//     console.log("request error: ", error)
//     return error;
// });
    
// testAxios.interceptors.response.use(
//     response => {
//     console.log("response: ", response)
//     return response;
//     }, error => {//we are not having bugsnag in here, because the user is not defined yet
//     // console.log("error on response: ",error)
//     console.log('response: ', error.response)
//     console.log("message: ", error.message)
//     if (error.response.status === 500){
//     	let arg = JSON.parse(error.response.config.data);
//     	console.log("we need to relaunch this request again", JSON.parse(error.response.config.data));
//     	setTimeout(()=>{
//     		console.log("trying it again")
//     		globalDispatch(testRequest(arg.data));
//     	}, 3000);
//     }else{
//     	return Promise.reject(error);
//     }
// });

// #define ECONNABORTED    103     // Software caused connection abort ask Alex

// function axiosErrorConfig(error){//errors that trigger re-request
// 	console.log("response from inside: ", error.response)
// 	return axiosRetry.isNetworkError(error)
// 	|| error.response.config.method === 'POST' 
// 	|| error.response.config.method === "GET"
// 	|| error.response.config.method === "PUT"
// 	|| error.response.config.method === "DELETE" 
// 	|| error.response.status === 404
// 	|| error.response.status === 422
// 	|| error.response.status >= 500
// }


// axiosRetry(testAxios, {
// 	retries: 4,
// 	retryDelay: (retryCount) => {
// 		console.log(retryCount)
//   		return (retryCount+1) * 1000;
// 	},
//   	retryCondition: (error) => { 
//   		return axiosErrorConfig(error);
//  	}
// });

