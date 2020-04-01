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
app.get('/stock/create', stocksController.createNewStock);
app.get('/stock/all', stocksController.getAll);
app.get('/stock/id/:id', stocksController.getStockById);
app.get('/stock/name/:name', stocksController.getStockByName);

/**
 * User routes
 */
app.get('/user/create', userController.createNewUser);
app.get('/user/all', userController.getAllUsers);
app.get('/user/name/:name', userController.getUserByName);
app.get('/user/id/:id', userController.getUserById);
app.get('/user/email/:email', userController.getUserByEmail);

// User favourites
app.get('/user/stock/add/:id', userController.addStock);
app.get('/user/stock/remove/:id', userController.removeStock);
app.get('/user/crypto/add/:id', userController.addCrypto);
app.get('/user/crypto/remove/:id', userController.removeCrypto);

/**
 * Crypto routes.
 */
app.get('/crypto/create', cryptoController.createNewCrypto);
app.get('/crypto/all', cryptoController.getAll);
app.get('/crypto/id/:id', cryptoController.getCryptoById);
app.get('/crypto/crypto_id/:crypto_id', cryptoController.getCryptoByCryptoId);
app.get('/crypto/name/:name', cryptoController.getCryptoByName);
app.get('/crypto/basics', cryptoController.getNameId);

module.exports = app;
