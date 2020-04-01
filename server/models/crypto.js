const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    crypto_id: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        validate: async (value) => {
            try {
                const result = await Crypto.findOne({crypto_id: value});
                if (result) throw new Error("Duplicate Crypto ID: " + value);
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    symbol: {
        type: String,
        uppercase: true,
        trim: true,
        validate: async (value) => {
            try {
                const result = await Crypto.findOne({symbol: value});
                if (result) throw new Error("Duplicate Crypto symbol: " + value);
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    latest_price: Number,
    market_cap: Number,
    day_vol: Number,
    day_change: Number,
    last_retrieved: Date,
    api_source: String
});

const Crypto = mongoose.model('Crypto', CryptoSchema, "crypto");

exports.addNewCrypto = async (cryto) => {
    await new Crypto(cryto).save((err) => { if (err) throw err; });
};

exports.getByName = async function(name) {
    const name_trimmed = name.trim();
    return await Crypto.find({name: name_trimmed});
};

exports.getByCryptoId = async function(crypto_id) {
    const crypto_id_trimmed = crypto_id.trim();
    return await Crypto.find({crypto_id: crypto_id_trimmed});
};

exports.getBySymbol = async (symbol) => {
    return await Crypto.find({symbol: symbol});
};

exports.getById = async function(id) {
    return await Crypto.findById(id);
};

exports.getAll = async function() {
    return await Crypto.find({});
};

exports.getBasics = async () => {
    return await Crypto.find({}, {_id:1, name:1});
};
