const path = require('path');
const User = require('../models/user');

// Add a new user
exports.createNewUser = async (req, res) => {
	await User.addNewUser(req.body);
	res.sendStatus(200);
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
