// require express
const express = require('express');
const path    = require('path');

// create our router object
var app = express.Router();

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);


 module.exports = app;
