const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('Category', CategorySchema);
