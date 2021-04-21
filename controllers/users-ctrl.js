const Users = require('../models/users');
const AppError = require('../managers/app_error');
const Bcrypt = require('../managers/bcrypt');

class UsersCtrl {
    async add(data) {
        const {email, name, file, password, role} = data;
        if (await Users.exists({email})) {
            throw new AppError('User exists', 400);
        }
        const user = new Users();
        user.email = email;
        user.password = await Bcrypt.hash(password);
        user.image = file?.path;
        user.name = name;
        user.role = role;
        return user.save();
    }

    async getById(id) {
        return Users.findOne({_id: id});
    }

    async getOne(options) {
        return Users.findOne(options);
    }

    async friendRequest(data) {
        const {userId, requestedUserId} = data;
        const [currentUser, requestedUser] = await Promise.all([
            Users.findById(userId),
            Users.findById(requestedUserId)
        ]);

        if (!currentUser || !requestedUser) {
            throw new AppError('Bad request', 403);
        }
        if (
            currentUser.sentFriendRequests.includes(requestedUserId)
            || currentUser.friendRequests.includes(requestedUserId)
            || currentUser.friends.some(user => user.id === requestedUserId)
        ) {
            throw new AppError('Bad request', 403);
        }
        currentUser.sentFriendRequests.push(requestedUserId);
        requestedUser.friendRequests.push(userId);

        return Promise.all([
            currentUser.save(),
            requestedUser.save()
        ]);
    }

    async acceptFriendRequest(data) {
        const {userId, requestedUserId} = data;
        const [currentUser, requestedUser] = await Promise.all([
            Users.findById(userId),
            Users.findById(requestedUserId)
        ]);

        if (!currentUser || !requestedUser) {
            throw new AppError('Bad request', 403);
        }

        if (currentUser.friendRequests.includes(requestedUserId)
            && requestedUser.sentFriendRequests.includes(userId)
        ) {
            currentUser.friendRequests.pull(requestedUserId);
            requestedUser.sentFriendRequests.pull(userId);

            currentUser.friends.push({
                id: requestedUserId,
                name: requestedUser.name,
                image: requestedUser.name,
            });
            requestedUser.friends.push({
                id: userId,
                name: currentUser.name,
                image: currentUser.name,
            });

            return Promise.all([
                currentUser.save(),
                requestedUser.save()
            ]);
        }
        throw new AppError('Bad request', 403);
    }

    async getFriendRequests(data) {
        const {userId} = data;
        const currentUser = await Users.findById(userId).populate('friendRequests');

        if (!currentUser) {
            throw new AppError('Bad request', 403);
        }

        return currentUser.friendRequests;
    }

    async getFriends(data) {
        const {userId} = data;
        const currentUser = await Users.findById(userId);

        if (!currentUser) {
            throw new AppError('Bad request', 403);
        }

        return currentUser.friends;
    }

    async getAll(data) {
        const options = {
            $and: [{
                _id: {$ne: data.userId}
            }]
        };
        if (data.name) {
            options.$and.push({
                name: new RegExp(data.name, 'i')
            });
        }

        return Users.find(options);
    }
}

module.exports = new UsersCtrl();
