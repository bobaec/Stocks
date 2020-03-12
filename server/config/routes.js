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
const userController = require('../controllers/user');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Stock routes.
 */
app.get('/stocks', stocksController.getAll);
app.get('/stocks/id/:id', stocksController.getStockById);
app.get('/stocks/:userId', stocksController.user)

/**
 * User routes
 */
app.get('/user/all', userController.getAllUsers);
app.get('/user/name/:name', userController.getUserByName);
app.get('/user/id/:id', userController.getUserById);

module.exports = app;
