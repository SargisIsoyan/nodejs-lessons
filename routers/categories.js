const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token');
const Posts = require('../models/posts');
const Users = require('../models/users');
const Roles = require('../configs/roles');
const CategoriesCtrl = require('../controllers/categories.ctrl');
const {body} = require('express-validator');

router.route('/').get(
    responseHandler,
    async (req, res) => {
        try {
            const categories = await CategoriesCtrl.getAll();
            res.onSuccess(categories);
        } catch (e) {
            res.onError(e);
        }
    }
).post(
    responseHandler,
    validateToken([Roles.admin, Roles.moderator]),
    body('name').exists(),
    async (req, res) => {
        try {
            const category = await CategoriesCtrl.add({
                name: req.body.name
            });
            res.onSuccess(category);
        } catch (e) {
            res.onError(e);
        }
    }
);

module.exports = router;
