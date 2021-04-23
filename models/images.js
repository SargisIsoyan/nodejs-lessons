const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImagesSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    description: String,
    image: String
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('Images', ImagesSchema);
