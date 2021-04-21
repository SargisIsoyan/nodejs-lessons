const Users = require('../models/users');
const Categories = require('../models/category');
const News = require('../models/news');
const Messages = require('../models/messages');
const AppError = require('../managers/app_error');
const Roles = require('../configs/roles');

class CategoriesCtrl {
    async add(data) {
        const {name} = data;
        return new Categories({
            name
        }).save();
    }

    async getAll() {
        return Categories.find();
    }
}

module.exports = new CategoriesCtrl();
