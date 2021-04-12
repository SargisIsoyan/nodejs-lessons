const Users = require('../models/users');
const AppError = require('../managers/app_error');
const Bcrypt = require('../managers/bcrypt');

class UsersCtrl {
    async add(data) {
        const {email, name, file, password} = data;
        if (await Users.exists({email})) {
            throw new AppError('User exists', 400);
        }
        const user = new Users();
        user.email = email;
        user.password = await Bcrypt.hash(password);
        user.image = file?.path;
        user.name = name;

        return user.save();
    }

    async getById(id) {
        return Users.findOne({_id: id});
    }

    async getOne(options) {
        return Users.findOne(options);
    }

    update() {

    }

    getAll() {

    }
}

module.exports = new UsersCtrl();
