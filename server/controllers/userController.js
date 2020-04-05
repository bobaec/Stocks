const path = require('path');
const User = require('../models/user');

// Add a new user
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

exports.getUserByEmail = async (req, res) => {
	try {
		res.status(200).send(await User.getByEmail(req.params.email));
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.getUserById = async function (req, res) {
	try {
		res.status(200).send(await User.getById(req.params.id));
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.getUserByName = async function (req, res) {
	try {
		res.status(200).send(await User.getByName(req.params.name));
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.getAllUsers = async function (req, res) {
	try {
		res.status(200).send(await User.getAll());
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.addStock = async (req, res) => {
	try {
		await User.addFavouriteStock(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.removeStock = async (req, res) => {
	try {
		await User.removeFavouriteStock(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.addCrypto = async (req, res) => {
	try {
		await User.addFavouriteCrypto(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.removeCrypto = async (req, res) => {
	try {
		await User.removeFavouriteCrypto(req.params.id, req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};
