const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const router = require('./router/router');//loading router from routes folder

// Set up the express app
const app = express();

// Log requests to the console.
app.use(morgan('dev'));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);//has to be at the end

// Setup a default catch-all route that sends back a welcome message in JSON format.

module.exports = app;