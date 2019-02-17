console.log('route handlers');
let results = require('../axiosmodule/axiosmodule');
console.log(results);

const getHandler = (req, res, next) => {
	//do some code here
	let data = results.weatherResults();
	data.then(weather => {
		console.log("successful request", weather.data)
		res.status(200).json({
  			message: weather.data		
  		})
	})
	data.catch(error => {
		console.log("error occured");
		res.status(400).json({
  			message: "error"
  		})
	})
}

const postHandler = (req, res, next) => {
	let address = req.body.address;
	let result = results.geoResults(address);
	result.then(data => {
		res.status(200).json({
  			message: data.json.results
		});
	})
	result.catch(error => {
		console.log('unsucessful georequest');
		res.status(400).json({
  			message: "error"
		});
	})
}


module.exports.getHandler = getHandler;
module.exports.postHandler = postHandler;
