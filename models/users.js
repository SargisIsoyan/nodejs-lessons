const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: String,
    image: String
});

module.exports = mongoose.model('Users', UsersSchema);
