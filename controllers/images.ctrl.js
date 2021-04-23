const Users = require('../models/users');
const Images = require('../models/images');
const AppError = require('../managers/app_error');
const Roles = require('../configs/roles');

class ImagesCtrl {
    async add(data) {
        const {userId, title, description, image} = data;
        if(!image){
            throw new AppError('image is empty', 403);
        }
        const user = await Users.findById(userId);

        if (!user || ![Roles.admin, Roles.moderator].includes(user.role)) {
            throw new AppError('user not found', 404);
        }

        return new Images({
            author: userId,
            title,
            description,
            image
        }).save();
    }

    async getAll() {
        return Images.find().populate('author', 'name');
    }
}

module.exports = new ImagesCtrl();
