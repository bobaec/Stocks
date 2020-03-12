// require express
const express = require('express');
const path    = require('path');

// create our router object
const app = express.Router();

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');
const stocksController = require('../controllers/stocksController');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Stock routes.
 */
app.get('/stocks/:id', stocksController.get)
app.get('/stocks', stocksController.getAll)
app.get('/stocks/:userId', stocksController.user)

module.exports = app;
