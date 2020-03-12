const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: String,
    symbol: String,
    latest_price: Number,
    last_retrieved: Date,
    api_source: String
});

module.exports = mongoose.model('Stock', StockSchema, "stock");