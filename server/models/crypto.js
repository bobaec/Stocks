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

const Crypto = mongoose.model('Crypto', CryptoSchema, "crypto");

exports.getByName = async function(name) {
    const name_trimmed = name.trim();
    return await Crypto.find({name: name_trimmed});
};

exports.getByCryptoId = async function(crypto_id) {
    const crypto_id_trimmed = crypto_id.trim();
    return await Crypto.find({crypto_id: crypto_id_trimmed});
};

exports.getById = async function(id) {
    return await Crypto.findById(id);
};

exports.getAll = async function() {
    return await Crypto.find({});
};

exports.getBasics = async () => {
    return await Crypto.find({}, {_id:1, name:1});
}
