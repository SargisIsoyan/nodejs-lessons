const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const Posts = require('../models/posts');
const Users = require('../models/users');

router.route('/').get(async (req, res) => {
    const posts = await Posts.find().populate({
        path: 'author',
        select: '-_id -image'
    });
    res.json(posts);
}).post(async (req, res) => {
    if(!(await Users.exists({_id:req.body.userId}))){
        throw new Error('User not found');
    }

    const post = new Posts({
        author: req.body.userId,
        title: req.body.title,
        body: req.body.body
    });
    await post.save();
    res.json(post);
});

router.route('/:id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});


module.exports = router;
