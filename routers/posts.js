const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token');
const Posts = require('../models/posts');
const Users = require('../models/users');
const Roles = require('../configs/roles');

router.route('/').get(async (req, res) => {
    const posts = await Posts.find().populate({
        path: 'author',
        select: '-_id -image'
    });
    res.json(posts);
}).post(
    responseHandler,
    validateToken([Roles.admin, Roles.moderator]),
    async (req, res) => {
        if (!(await Users.exists({_id: req.decoded.userId}))) {
            throw new Error('User not found');
        }

        const post = new Posts({
            author: req.decoded.userId,
            title: req.body.title,
            body: req.body.body
        });
        await post.save();
        res.onSuccess(post);
    }
);
router.route('/:id/comments').get().post();
router.route('/:id/comments/:comm_id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});
router.route('/:id/comments/:comm_id/likes').get().post();
router.route('/:id/comments/:comm_id/likes/:like_id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});

router.route('/:id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});


module.exports = router;
