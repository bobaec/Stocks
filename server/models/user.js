const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// https://stackoverflow.com/a/58156249   ES6 Style
const UserSchema = new Schema({
    name: { type: String, required:true },
    email: {
        type: String,
        lowercase: true,
        required: true,
        validate: async (value) => {
            try {
                const result = await User.findOn({email: value});
                if (result) throw new Error("Duplicate email: " + value);
            } catch (error) {
                throw new Error(error);
            }
        }
    },
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

exports.getByEmail = async (email) => {
    const email_lower = email.toLowerCase();
    return await User.find({email: email_lower});
};

// Get user by id
exports.getById = async function (id) {
    return await User.findById(id);
};

// Get user by name
exports.getByName = async function (name) {
    return await User.find({name: name});
};

// Get all users
exports.getAll = async function () {
    return await User.find({});
};
