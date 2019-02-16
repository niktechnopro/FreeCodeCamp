console.log('loading router module')
var express = require('express');
var router = express.Router();
var handlers = require('../handlers/handlers.js');//route handlers

// middleware that is specific to this router - not needed as we use morgan in app.js
// router.use(function timeLog (req, res, next) {
//     let d = new Date();
//     console.log('Time: ', d.toString())//just to log request time
//     next()
// })

// define the home page route(we using handler function chaining for one route)
router.route('/')
    .get(handlers.getHandler);

module.exports = router;