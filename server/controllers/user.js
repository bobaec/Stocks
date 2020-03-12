const path = require('path');
const User = require('../models/user');

// Display users
exports.index = function (req, res) {
	res.sendFile(path.resolve('views/user.html'));
};

// Create new user
exports.create = function (req, res) {
	var newUser = new User(req.body);
	console.log(req.body);
	newUser.save(function (err) {
	    if(err) {
	    res.status(400).send('Unable to save a new user to database');
	} else {
	    res.redirect('/user/getuser');
	}
	});
};

// Show all collection data
exports.list = function (req, res) {
	User.find({}).exec(function (err, user) {
		if (err) {
			    return res.send(500, err);
		}
		res.render('getuser', {
			    user: user
		 });
	});
};

exports.getAllUsers = function (req, res) {
	const users = User.getAll();
    res.send(users);
};