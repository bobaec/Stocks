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
        required: true
    },
    symbol: {
        type: String,
        uppercase: true,
        trim: true
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
    // Check if crypto_id exists
    const cryptoId = await Crypto.findOne({crypto_id: cryto.crypto_id});
    if (cryptoId != null) return "Duplicate crypto id :" + cryto.crypto_id;

    // Check if symbol exists
    const symbol = await Crypto.findOne({symbol: cryto.symbol});
    if (symbol != null) return "Duplicate symbol :" + cryto.symbol;

    // Add new crypto
    await new Crypto(cryto).save((err) => { if (err) throw err; });
    return null;
};

exports.getByName = async function(name) {
    const name_trimmed = name.trim();
    return await Crypto.find({name: name_trimmed});
};

exports.getByCryptoId = async function(crypto_id) {
    const crypto_id_trimmed = crypto_id.trim();
    let dbCoin = await getUpdatedCoin(crypto_id_trimmed);

    if (Array.isArray(dbCoin)) {
        dbCoin = dbCoin[0];
    }

    const coinFormat = {
        id: dbCoin.crypto_id,
        name: dbCoin.name,
        crypto_id: dbCoin.crypto_id,
        symbol: dbCoin.symbol,
        latest_price: dbCoin.latest_price,
        market_cap: dbCoin.market_cap,
        day_vol: dbCoin.day_vol,
        day_change: dbCoin.day_change,
        last_updated_at: dbCoin.last_retrieved
    };
    return coinFormat;
};

const getUpdatedCoin = async function(id) {
    let dbCoin = await Crypto.find({crypto_id: id});
    const now = Date.now();
    if (new Date(dbCoin[0].last_retrieved) + (3600 * 1000) < now || dbCoin[0].last_retrieved === undefined) {
        let coin = await crypto.getCoin(id);
        coin = coin[id];
        const filter = {crypto_id: id};
        const update = {latest_price: coin.cad, market_cap: coin.cad_market_cap, day_vol: coin.cad_24h_vol, day_change: coin.cad_24h_change, last_retrieved: coin.last_updated_at*1000};
        dbCoin = await Crypto.findOneAndUpdate(filter, update, {new: true});
    }

    return dbCoin;
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

const crypto = require('../../src/pages/crypto/crypto');
