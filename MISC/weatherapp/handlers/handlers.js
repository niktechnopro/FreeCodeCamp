console.log('route handlers');

const getHandler = (req, res, next) => {
	//do some code here
	res.status(200).send({
  	message: 'Welcome to the weather app',
	});
}


module.exports.getHandler = getHandler;
