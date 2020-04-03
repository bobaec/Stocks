const Stock = require('../models/stock');

/**
 * GET /
 *  Stock By Id.
 */
exports.getStockById = async (req, res) => {
	const stock = await Stock.getById(req.params.id);
	res.send(stock);
};


// Get By Name
exports.getStockByName = async (req, res) => {
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

const StockAPI = require('../utils/stocks');

exports.getMarketData = async (req, res) => {
	const markets = await StockAPI.getMarketData();
	res.send(markets);
}

exports.searchForStockId = async (req, res) => {
	const stock = await StockAPI.stockSearch(req.params.name);
	res.send(stock);
};

exports.searchForStock = async (req, res) => {
	const stocks = await StockAPI.getStocks(req.params.ids);
	res.send(stocks);
};