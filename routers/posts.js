//2. Ստեղծել express framework-ով web aplication : Ստեղծել /posts route , որին կարող են կատարել GET, POST , PUT և DETELE մեթոդներով request-ներ ։
// Բոլորի դեպքում վերադարձնում որպես response ժամը և մեթոդի անունը։
//

const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');

router.route('/').get((req, res) => {
    console.log(req.query.limit);
    console.log(req.query);
    res.end(new Date().toDateString() + ' GET get all posts');
}).post(upload.array('photos', 2), (req, res) => {
    console.log(req.body.name);
    console.log(req.body.lastName);
    console.log(req.files);
    res.json({
        name: req.body.name,
        lastName: req.body.lastName,
        isNuynObject: req['NuynObject']
    });
});

router.route('/').put((req, res) => {
    res.end(new Date().toDateString() + ' PUT update post');
}).delete((req, res) => {
    res.end(new Date().toDateString() + ' DELETE delete post');
});

router.route('/:id').get((req, res) => {
    res.end('get ' + req.params.id);
}).put((req, res) => {
    res.end('editing ' + req.params.id);
}).delete((req, res) => {
    res.end('deleting ' + req.params.id);
});


module.exports = router;
