const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    last_login: Date,
    stocks: {
        stock_name: String,
        latest_price: Number
    }
});

module.exports = mongoose.model('User', UserSchema, "user");
