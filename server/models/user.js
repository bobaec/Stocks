const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    last_login: Date,
    stocks: [
        {
            stock_name: String,
            stock_symbol: String,
            latest_stock_price: Number
        }
    ],
    cryptos: [
        {
            crypto_name: String,
            crypto_symbol: String,
            latest_crypto_price: Number
        }
    ]
});

const User = mongoose.model('User', UserSchema, "user");
module.exports = User

// Add new user
exports.addNewUser = function (req, res) {
    new User(req.body).save(function (err) {
        if (err) {
            res.status(400).send('Unable to save a new user to database');
            console.log("Failed to save user");
            console.log(err);
        } else {
            res.status(200).send("Successfully added new user");
        }
    });
};

exports.getuserById = function (req, res) {
    var objectId = mongoose.Types.ObjectId(req.params.id);   // Convert string to objectId
    User.find({_id: objectId});
};

// Get user by name
exports.getUserByName = function (req, res) {
    User.find({name: req.params.name});
};

// Get all users
exports.getAllUsers = function (req, res) {
    // var query = User.find({});
    // query.exec(function (err, data) {
    //     if (err) {
    //         return res.status(500).send(err);
    //     }
    //     return res.send(data);
    // });

    var users = User.find({}).exec();
    res.send(users);
};
