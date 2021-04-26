const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const MessagesSchema = new Schema({
    from: {type: ObjectId, ref: 'Users'},
    group_id: {type: ObjectId, ref: 'Groups'},
    value: String
}, {timestamps: true, versionKey: false});

const GroupSchema = new Schema({
    name: String,
    members: [{type: ObjectId, ref: 'Users'}],
}, {timestamps: true, versionKey: false});

module.exports = mongoose.model('Messages', MessagesSchema);
