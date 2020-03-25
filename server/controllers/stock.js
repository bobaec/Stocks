const Stock = require('../models/stock');


// Add a new stock
exports.createNewStock = async (req, res) => {
	await Stock.addNewStock(req.body);
	res.sendStatus(200);
};

/**
 * GET /
 *  Stock By Id.
 */
exports.getStockById = async function (req, res) {
	const stock = await Stock.getById(req.params.id);
	res.send(stock);
};


// Get By Name
exports.getStockByName = async function (req, res) {
	const stock = await Stock.getByName(req.params.name);
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
