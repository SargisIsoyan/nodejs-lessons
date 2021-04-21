const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    description: String,
    image: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('News', NewsSchema);
