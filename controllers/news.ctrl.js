const Users = require('../models/users');
const Categories = require('../models/category');
const News = require('../models/news');
const Messages = require('../models/messages');
const AppError = require('../managers/app_error');
const Roles = require('../configs/roles');

class NewsCtrl {
    async add(data) {
        const {userId, title, description, image, categoryId} = data;

        const user = await Users.findById(userId);

        if (!user || ![Roles.admin, Roles.moderator].includes(user.role)) {
            throw new AppError('user not found', 404);
        }

        const category = await Categories.findById(categoryId);
        if (!category) {
            throw new AppError('category not found', 404);
        }

        return new News({
            author: userId,
            category: categoryId,
            title,
            description,
            image
        }).save();
    }

    async getAll() {
        return News.find().populate('author', 'name');
    }
}

module.exports = new NewsCtrl();
