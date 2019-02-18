console.log('axios module loaded');
const axios = require('axios');
const gMap = require('@google/maps');
require('dotenv').config();
//creating google maps client
const googleMapsClient = gMap.createClient({
  key: process.env.gMap_API,
  Promise: Promise
});

// let gmapAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=`+process.env.gMap_API;


let testurl = "http://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
//Query parameters are key/value pairs that allow us to pass in data to a URL.


const weatherResults = (latlon) => {
	let weatherUrl = process.env.baseAPI+`?lat=${latlon.lat}&lon=${latlon.lng}&appid=`+process.env.WEATHER_API_KEY;
	return axios(weatherUrl);
}		


const geoResults = (address) => {
	return googleMapsClient.geocode({address: address}).asPromise()
}


module.exports.weatherResults = weatherResults;
module.exports.geoResults = geoResults;