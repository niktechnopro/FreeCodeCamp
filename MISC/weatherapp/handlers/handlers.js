console.log('route handlers');
let results = require('../axiosmodule/axiosmodule');
console.log(results);

const getHandler = (req, res, next) => {
	//do some code here
	// res.status(200).send({
 //  		message: results()
	// });
	//if you see a question to allow detect location - allow
	//if get latlon => do weather first

}

const postHandler = (req, res, next) => {
	res.status(200).send({
  		message: "post request received"
	});
	//if get zip => do geo first
	//if get latlon => do weather first
}


module.exports.getHandler = getHandler;
module.exports.postHandler = postHandler;
