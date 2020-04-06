const path = require('path');
const User = require('../models/user');

/**
 * POST /
 *  New User.
 */
exports.createNewUser = async (req, res) => {
	try {
		// Try to handle duplicate email error
		const result = await User.addNewUser(req.body);
		if (result != null) {
			res.status(500).send(result);
		} else {
			res.sendStatus(200);
		}
	} catch (e) {
		res.sendStatus(500);
	}
};

/**
 * GET /
 *  User by Email.
 */
exports.getUserByEmail = async (req, res) => {
	try {
		res.status(200).send(await User.getByEmail(req.params.email));
	} catch (err) {
		res.sendStatus(500);
	}
};

/**
 * GET /
 *  User by ID.
 */
exports.getUserById = async function (req, res) {
	try {
		res.status(200).send(await User.getById(req.params.id));
	} catch (err) {
		res.sendStatus(500);
	}
};

/**
 * GET /
 *  User by NAME.
 */
exports.getUserByName = async function (req, res) {
	try {
		res.status(200).send(await User.getByName(req.params.name));
	} catch (err) {
		res.sendStatus(500);
	}
};


/**
 * GET /
 *  All users.
 */
exports.getAllUsers = async function (req, res) {
	try {
		res.status(200).send(await User.getAll());
	} catch (err) {
		res.sendStatus(500);
	}
};


/**
 * POST /
 *  New Stock to user favourits.
 */
exports.addStock = async (req, res) => {
	try {
		await User.addFavouriteStock(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};


/**
 * DELETE /
 *  Delete Stock from user favourits.
 */
exports.removeStock = async (req, res) => {
	try {
		await User.removeFavouriteStock(req.params.id, req.params.favId);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};


/**
 * POST /
 *  New CRYPTO to user favourits.
 */
exports.addCrypto = async (req, res) => {
	try {
		await User.addFavouriteCrypto(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};


/**
 * DELETE /
 *  Delete Crypto from user favourits.
 */
exports.removeCrypto = async (req, res) => {
	try {
		await User.removeFavouriteCrypto(req.params.id, req.params.favId);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};
