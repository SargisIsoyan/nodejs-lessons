const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    body: String,
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('Post', Post);
