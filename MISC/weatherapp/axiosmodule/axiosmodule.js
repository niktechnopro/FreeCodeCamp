console.log('axios module loaded');
const axios = require('axios');
const gMap = require('@google/maps');
require('dotenv').config();
const googleMapsClient = gMap.createClient({
  key: process.env.gMap_API,
  Promise: Promise
});


let weatherUrl = process.env.baseAPI+"?lat=33.8466227&lon=-84.3286911&appid="+process.env.WEATHER_API_KEY;
// let gmapAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`+process.env.gMap_API;

//creating google maps client



let testurl = "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
//Query parameters are key/value pairs that allow us to pass in data to a URL.
// latitude: 33.8466227
// longitude: -84.3286911

// let byCoordinates = `?lat={lat}&lon={lon}`;
// let byZipCode = `?zip={zip code},{country code}`


let weatherResults = (coordinates) => {
	return axios.get(weatherUrl);
}


let geoResults = (address) => {
	return googleMapsClient.geocode({address: address}).asPromise()
}


module.exports.weatherResults = weatherResults;
module.exports.geoResults = geoResults;