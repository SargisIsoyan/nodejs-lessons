const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    body: String,
    image: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
}, {versionKey: false, timestamps: true});


const Orders = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'Users'},
    total_price: Number,
    payment_method: String,
    products: [Object],//{type: Schema.Types.ObjectId, ref: 'Products'}
    shipment_address: {
        city: String,
    },
    status: ''
}, {versionKey: false, timestamps: true});

module.exports = mongoose.model('Post', Post);
