const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    user_id: Schema.ObjectId,
    user_name: String
});

module.exports = mongoose.model('Users', UsersSchema, "users");
