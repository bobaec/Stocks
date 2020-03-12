const Stock = require('../models/stock');

/**
 * GET /
 *  Stock By Id.
 */
exports.getStockById = async function (req, res) {
	const stock = await Stock.getById(req.params.id);
	res.send(stock);
};


/**
 * GET /
 *  All stocks.
 */
 exports.getAll = async (req, res) => {
     const stocks = await Stock.getAll();
     res.send(stocks);
 };

/**
 * GET /
 *  Favourite Stocks for a user.
 */
exports.user = (req, res) => {
    res.send('Stock: ' + req.params.userId);
};
