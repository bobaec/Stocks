const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoSchema = new Schema({
    name: String,
    crypto_id: String,
    symbol: String,
    latest_price: Number,
    last_retrieved: Date,
    api_source: String
});

module.exports = mongoose.model('Crypto', CryptoSchema, "crypto");
