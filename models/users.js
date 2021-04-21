const mongoose = require('mongoose');
const Roles = require('../configs/roles');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsersSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: String,
    resetPassToken: String,
    name: String,
    image: String,
    isActive: {type: Boolean, default: true},
    friends: [{
        id: {type: ObjectId, ref: 'Users'},
        name: String,
        image: String
    }],
    sentFriendRequests: [{type: ObjectId, ref: 'Users'}],
    friendRequests: [{type: ObjectId, ref: 'Users'}],
    role: {type: String, enum: Object.values(Roles), default: 'user'}
});

module.exports = mongoose.model('Users', UsersSchema);
