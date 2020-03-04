const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const APISchema = new Schema({
    name: String,
    source: String
});

module.exports = mongoose.model('API', APISchema, "api");
