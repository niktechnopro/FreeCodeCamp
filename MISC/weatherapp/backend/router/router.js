console.log('loading router module')
let express = require('express');
let router = express.Router();
let handlers = require('../handlers/handlers.js');//route handlers

// middleware that is specific to this router - not needed as we use morgan in app.js
// router.use(function timeLog (req, res, next) {
//     let d = new Date();
//     console.log('Time: ', d.toString())//just to log request time
//     next()
// })

// define the home page route(we using handler function chaining for one route)
router.route('/basedOnLatLon')
    .post(handlers.postHandlerLatLon)

router.route('/getweather')
    .get(handlers.getHandler)
    .post(handlers.postHandler)

router.route('/forecast')
	.post(handlers.forecastHandler)

router.route('/test')
	.post(handlers.testHandler)
	.get(handlers.testHandler)

module.exports = router;