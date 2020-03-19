// require express
const express = require('express');
const path    = require('path');

// create our router object
const app = express.Router();

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/home');
const stocksController = require('../controllers/stock');
const userController = require('../controllers/user');
const cryptoController = require('../controllers/crypto');

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
 * Crypto routes.
 */
app.get('/crypto/all', cryptoController.getAll);
app.get('/crypto/id/:id', cryptoController.getCryptoById);
app.get('/crypto/crypto_id/:crypto_id', cryptoController.getCryptoByCryptoId);
app.get('/crypto/name/:name', cryptoController.getCryptoByName);

module.exports = app;
