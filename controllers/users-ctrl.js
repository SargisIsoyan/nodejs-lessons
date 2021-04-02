const Users = require('../models/users');
const AppError = require('../managers/app_error');

class UsersCtrl {
    async add(data) {
        const {username, name, file: {path}} = data;
        if (await Users.exists({username})) {
            throw new AppError('User exists', 400);
        }
        const user = new Users();
        user.username = username;
        user.image = path;
        user.name = name;

        return user.save();
    }

    async getById(id) {
        return Users.findOne({_id: id});
    }

    update() {

    }

    getAll() {

    }
}

module.exports = new UsersCtrl();
