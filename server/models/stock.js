const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: String,
    symbol: {
        type: String,
        uppercase: true,
        trim: true,
        validate: async (value) => {
            try {
                const result = await Stock.findOne({symbol: value});
                if (result) throw new Error("Duplicate Stock symbol: " + value);
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    latest_price: Number,
    last_retrieved: Date,
    api_source: String
});

const Stock = mongoose.model('Stock', StockSchema, "stock");

exports.addNewStock = async (stock) => {
    await new Stock(stock).save((err) => { if (err) throw err; });
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
