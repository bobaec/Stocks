const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rp = require('request-promise');
const apiURL = 'https://api.coingecko.com/api/v3/coins/markets'
const getCoins = {
    method: 'GET',
    uri: apiURL,
    json: true,
    qs: {
        'vs_currency': 'cad',
        'order': 'market_cap_desc',
        'per_page': 250,
        'page': 1,
        'sparkline': false
    }
};

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

const cryptoInit = async () => {
    try {
        const coinList = await rp(getCoins);
        coinList.forEach(coin => {
            new Crypto({
                name: coin.name,
                crypto_id: coin.id,
                symbol: coin.symbol,
                latest_price: coin.current_price,
                last_retrieved: coin.last_updated,
                api_source: apiURL,
                image: coin.image
            }).save(function(err, data) {
                if (err) {
                    console.log(`Error occurred while saving: ${err}`);
                }
            });
        });
    } catch (e) {
        console.log('err', e);
    }
};
