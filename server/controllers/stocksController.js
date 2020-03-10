const Stock = require('../models/stock');

/**
 * GET /
 *  Stock By Id.
 */
exports.get = (req, res) => {
    res.send('Stock: ' + req.params.id);
};

/**
 * GET /
 *  All stocks.
 */
exports.getAll = (req, res) => {
    res.send('Stocks');
};

/**
 * GET /
 *  Favourite Stocks for a user.
 */
exports.user = (req, res) => {
    res.send('Stock: ' + req.params.userId);
};
  