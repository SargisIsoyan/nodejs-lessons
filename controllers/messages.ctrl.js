const Users = require('../models/users');
const Messages = require('../models/messages');
const AppError = require('../managers/app_error');

class MessagesCtrl {
    async send(data) {
        const {userId, to, value} = data;
        const [fromUser, toUser] = await Promise.all([
            Users.findById(userId),
            Users.findById(to)
        ]);

        if (!fromUser || !toUser) {
            throw new AppError('Bad request', 403);
        }

        return new Messages({
            from: fromUser._id,
            to: toUser._id,
            value
        }).save();
    }

    async getMessages(data) {
        const {userId, to} = data;
        const [fromUser, toUser] = await Promise.all([
            Users.findById(userId),
            Users.findById(to)
        ]);

        if (!fromUser || !toUser) {
            throw new AppError('Bad request', 403);
        }

        return Messages.find({
            from: {$in: [userId, to]},
            to: {$in: [userId, to]}
        });
    }
}

module.exports = new MessagesCtrl();
