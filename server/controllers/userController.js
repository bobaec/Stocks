const path = require('path');
const User = require('../models/user');

// Add a new user
exports.createNewUser = async (req, res) => {
	try {
		await User.addNewUser(req.body);
		res.sendStatus(200);
	} catch (err) {
		res.sendStatus(500);
	}
};

exports.getUserByEmail = async (req, res) => {
	const user = await User.getByEmail(req.params.email);
	res.send(user);
};

exports.getUserById = async function (req, res) {
	const user = await User.getById(req.params.id);
	res.send(user);
};

exports.getUserByName = async function (req, res) {
	const user = await User.getByName(req.params.name);
	res.send(user);
};

exports.getAllUsers = async function (req, res) {
	const users = await User.getAll();
    res.send(users);
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
