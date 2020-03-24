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
const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Stock routes.
 */
app.get('/stock/all', stocksController.getAll);
app.get('/stock/id/:id', stocksController.getStockById);
app.get('/stock/name/:name', stocksController.getStockByName);

app.get('/stock/:userId', stocksController.user)

/**
 * User routes
 */
app.get('/user/all', userController.getAllUsers);
app.get('/user/name/:name', userController.getUserByName);
app.get('/user/id/:id', userController.getUserById);
app.get('/user/email/:email', userController.getUserByEmail);


/**
 * News routes
 */
app.get('/news/top/:q', newsController.query);

module.exports = app;
