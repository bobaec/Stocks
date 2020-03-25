const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoSchema = new Schema({
    name: String,
    crypto_id: String,
    symbol: String,
    latest_price: Number,
    last_retrieved: Date,
    api_source: String,
    image: String
});

const Crypto = mongoose.model('Crypto', CryptoSchema, "crypto");

exports.getById = async function(id) {
    return await Crypto.findById(id);
};

exports.getAll = async function() {
    return await Crypto.find({});
};
