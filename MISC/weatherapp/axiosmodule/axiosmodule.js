console.log('axios module loaded');
const axios = require('axios');
const gMap = require('@google/maps');
const NodeGeocoder = require('node-geocoder');
require('dotenv').config();
//creating google maps client
const googleMapsClient = gMap.createClient({
  key: process.env.gMap_API,
  Promise: Promise
});


var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: process.env.gMap_API, // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

// let gmapAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`+process.env.gMap_API;


let testurl = "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
//Query parameters are key/value pairs that allow us to pass in data to a URL.
const geoResultsLatLon = (latlon) => {
	return geocoder.reverse({lat: latlon.lat, lon: latlon.lng})
}


const weatherResults = (latlon) => {
	let weatherUrl = process.env.baseAPI+`?lat=${latlon.lat}&lon=${latlon.lng}&appid=`+process.env.WEATHER_API_KEY;
	return axios(weatherUrl);
}

const fiveDaysWeatherResults = (latlon) => {
  let fiveDaysWeatherUrl = process.env.fiveDaysAPI+`?lat=${latlon.lat}&lon=${latlon.lng}&appid=`+process.env.WEATHER_API_KEY;
  return axios(fiveDaysWeatherUrl);
}	

const geoResults = (address) => {
	return googleMapsClient.geocode({address: address}).asPromise()
}


module.exports.weatherResults = weatherResults;
module.exports.geoResults = geoResults;
module.exports.geoResultsLatLon = geoResultsLatLon;
module.exports.fiveDaysWeatherResults = fiveDaysWeatherResults;