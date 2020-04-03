const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    symbol: {
        type: String,
        uppercase: true,
        trim: true,
        required: true
    },
    latest_price: Number,
    last_retrieved: Date,
    api_source: String
});

const Stock = mongoose.model('Stock', StockSchema, "stock");

exports.addNewStock = async (stock) => {
    // Check if symbol already exists
    const symbol = await Stock.findOne({symbol: stock.symbol});
    if (symbol != null) return "Duplicate symbol :" + stock.symbol;

    // Add new stock
    await new Stock(stock).save((err) => { if (err) throw err; });
    return null;
};

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

exports.getBySymbol = async (symbol) => {
    return await Stock.find({symbol: symbol});
};
