const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// https://stackoverflow.com/a/58156249   ES6 Style
const UserSchema = new Schema({
    name: { type: String, required:true },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    last_login: Date,
    stocks: [
        {
            stock_name: {
                type: String,
                required: true
            },
            stock_symbol: {
                type: String,
                uppercase: true,
                required: true
            },
            latest_stock_price: Number
        }
    ],
    cryptos: [
        {
            crypto_name: {
                type: String,
                required: true
            },
            crypto_symbol: {
                type: String,
                uppercase: true,
                required: true
            },
            latest_crypto_price: Number
        }
    ]
});
const User = mongoose.model('User', UserSchema, "user");

exports.addNewUser = async (user) => {
    // Check if email exists
    const existingEmail = await User.findOne({email: user.email});
    if (existingEmail != null) return "Duplicate email: newemail@email.com";

    // Add the new user
    await new User(user).save((err) => { if (err) throw err; });
    return null;
};

exports.getByEmail = async (email) => {
    const email_lower = email.toLowerCase().trim();
    return await User.find({email: email_lower});
};

// Get user by id
exports.getById = async function (id) {
    return await User.findById(id);
};

// Get user by name
exports.getByName = async function (name) {
    const name_trimmed = name.trim();
    return await User.find({name: name_trimmed});
};

// Get all users
exports.getAll = async function () {
    return await User.find({});
};

// Stock favourites
exports.addFavouriteStock = async (id, stock) => {
    await User.findByIdAndUpdate(id, { $push: {"stocks": stock}}, (err, result) => {
        if (err) throw err;
    })
};

exports.removeFavouriteStock = async (id, stockSymbol) => {
    await User.findByIdAndUpdate(id, { $pull: {"stocks": {"stock_symbol": stockSymbol}}},
        (err, result) => {
            if (err) throw err;
    })
};

// Crypto favourites
exports.addFavouriteCrypto = async (id, crypto) => {
    await User.findByIdAndUpdate(id, { $pull: {"cryptos": crypto}}, (err, result) => {
            if (err) throw err;
        })
};

exports.removeFavouriteCrypto = async (id, cryptoSymbol) => {
    await User.findByIdAndUpdate(id, { $pull: {"cryptos": {"crypto_symbol": cryptoSymbol}}},
        (err, result) => {
            if (err) throw err;
        })
};
