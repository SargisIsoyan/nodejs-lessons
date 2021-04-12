const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: String,
    resetPassToken: String,
    name: String,
    image: String,
    isActive: {type: Boolean, default: false}
});

module.exports = mongoose.model('Users', UsersSchema);
