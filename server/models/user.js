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

module.exports = mongoose.model('User', UserSchema, "user");
