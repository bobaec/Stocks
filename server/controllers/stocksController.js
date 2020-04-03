const Stock = require('../models/stock');


// Add a new stock
exports.createNewStock = async (req, res) => {
	try {
		// Try to handle duplicate symbol error
		const result = await Stock.addNewStock(req.body);
		if (result != null) {
			res.status(500).send(result);
		} else {
			res.sendStatus(200);
		}
	} catch (err) {
		res.sendStatus(500);
	}
};

/**
 * GET /
 *  Stock By Id.
 */
exports.getStockById = async (req, res) => {
	try {
		res.status(200).send(await Stock.getById(req.params.id));
	} catch (err) {
		res.sendStatus(500);
	}
};

// Get By Name
exports.getStockByName = async (req, res) => {
	try {
		res.status(200).send(await Stock.getByName(req.params.name));
	} catch (err) {
		res.sendStatus(500);
	}
};

/**
 * GET /
 *  All stocks.
 */
 exports.getAll = async (req, res) => {
	 try {
		 res.status(200).send(await Stock.getAll());
	 } catch (err) {
		 res.sendStatus(500);
	 }
 };

exports.getStockBySymbol = async (req, res) => {
	try {
		res.status(200).send(await Stock.getBySymbol(req.params.symbol));
	} catch (err) {
		res.sendStatus(500);
	}
};
