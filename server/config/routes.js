// require express
const express = require('express');

// create our router object
const app = express.Router();

// For json body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

/**
 * Controllers (route handlers).
 */
const homeController = require('../controllers/homeController');
const stocksController = require('../controllers/stocksController');
const userController = require('../controllers/userController');
const cryptoController = require('../controllers/cryptoController');
const newsController = require('../controllers/newsController');

/**
 * Primary app routes.
 */
app.get('/', homeController.index);

/**
 * Stock routes.
 */
app.post('/stock/create', stocksController.createNewStock);
app.get('/stock/all', stocksController.getAll);
app.get('/stock/id/:id', stocksController.getStockById);
app.get('/stock/name/:name', stocksController.getStockByName);
app.get('/stock/symbol/:symbol', stocksController.getStockBySymbol);

/**
 * User routes
 */
app.post('/user/create', userController.createNewUser);
app.get('/user/all', userController.getAllUsers);
app.get('/user/name/:name', userController.getUserByName);
app.get('/user/id/:id', userController.getUserById);
app.get('/user/email/:email', userController.getUserByEmail);

// User favourites
app.post('/user/stock/add/:id', userController.addStock);
app.post('/user/stock/remove/:id', userController.removeStock);
app.post('/user/crypto/add/:id', userController.addCrypto);
app.post('/user/crypto/remove/:id', userController.removeCrypto);

/**
 * Crypto routes.
 */
app.post('/crypto/create', cryptoController.createNewCrypto);
app.get('/crypto/all', cryptoController.getAll);
app.get('/crypto/id/:id', cryptoController.getCryptoById);
app.get('/crypto/crypto_id/:crypto_id', cryptoController.getCryptoByCryptoId);
app.get('/crypto/symbol/:symbol', cryptoController.getCryptoBySymbol);
app.get('/crypto/name/:name', cryptoController.getCryptoByName);
app.get('/crypto/basics', cryptoController.getNameId);


/**
 * News routes
 */
app.get('/news/top/:query', newsController.query);


module.exports = app;
