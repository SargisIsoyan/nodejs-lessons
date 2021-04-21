const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token');
const validationResult = require('../middlewares/validation_result');
const Posts = require('../models/posts');
const Users = require('../models/users');
const Roles = require('../configs/roles');
const NewsCtrl = require('../controllers/news.ctrl');
const mongoose = require('mongoose');
const {body} = require('express-validator');

router.route('/').get(
    responseHandler,
    async (req, res) => {
        try {
            const categories = await NewsCtrl.getAll();
            res.onSuccess(categories);
        } catch (e) {
            res.onError(e);
        }
    }
).post(
    upload.single('image'),
    responseHandler,
    validateToken([Roles.admin, Roles.moderator]),
    body('title').exists().isLength({min: 10}),
    body('description').exists().isLength({min: 10}),
    body('category').exists().custom(value => mongoose.Types.ObjectId.isValid(value)),
    validationResult,
    async (req, res) => {
        try {
            const post = await NewsCtrl.add({
                userId: req.decoded.userId,
                title: req.body.title,
                description: req.body.description,
                categoryId: req.body.category,
                image: req.file ? req.file.filename : undefined
            });
            res.onSuccess(post);
        } catch (e) {
            res.onError(e);
        }
    }
);

router.route('/:id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});


module.exports = router;
