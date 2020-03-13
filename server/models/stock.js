const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: String,
    symbol: String,
    latest_price: Number,
    last_retrieved: Date,
    api_source: String
});

const Stock = mongoose.model('Stock', StockSchema, "stock");

exports.getByName = async function(name) {
    const name_trimmed = name.trim();
    return await Stock.find({name: name_trimmed});
};


exports.getById = async function(id) {
    return await Stock.findById(id);
};

exports.getAll = async function() {
    return await Stock.find({});
};
