const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CryptoSchema = new Schema({
    name: String,
    crypto_id: String,
    symbol: String,
    latest_price: Number,
    market_cap: Number,
    day_vol: Number,
    day_change: Number,
    last_retrieved: Date,
    api_source: String
});

const Crypto = mongoose.model('Crypto', CryptoSchema, "crypto");

exports.getById = async function(id) {
    return await Crypto.findById(id);
};

exports.getByCryptoId = async function(id) {
    const id_trimmed = id.trim();
    let dbCoin = await getUpdatedCoin(id_trimmed);
    
    if (Array.isArray(dbCoin)) {
        dbCoin = dbCoin[0];
    }
    
    const coinFormat = {
        id: dbCoin.crypto_id,
        name: dbCoin.name,
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

exports.getAll = async function() {
    return await Crypto.find({});
};


const crypto = require('../../src/pages/crypto/crypto');