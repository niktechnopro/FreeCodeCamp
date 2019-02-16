console.log('axios module loaded');
let axios = require('axios');
require('dotenv').config();

// console.log(process.env.baseAPI);

//Query parameters are key/value pairs that allow us to pass in data to a URL.
// latitude: 33.8466227
// longitude: -84.3286911

let byCoordinates = `?lat={lat}&lon={lon}`;
let byZipCode = `?zip={zip code},{country code}`


let weatherResults = () => {
	// axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
	// .then(response => {
	//   console.log(response.data.url);
	//   console.log(response.data.explanation);
	// })
	// .catch(error => {
	//   console.log(error);
	// });
	return "results from axiosmodule";
}


let geoResults = () => {

}


module.exports.weatherResults = weatherResults;
module.exports.geoResults = geoResults;