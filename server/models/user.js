const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// https://stackoverflow.com/a/58156249   ES6 Style
const UserSchema = new Schema({
    name: { type: String, required:true },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: async (value) => {
            try {
                const result = await User.findOne({email: value});
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

exports.addNewUser = async (user) => {
    await new User(user).save((err) => { if (err) throw err; });
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
