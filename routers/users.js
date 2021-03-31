//Ունենք users.json ֆայլ , այն սկզբում պարունակում է դատարկ օբյեկտ․ Ոնենալ users route որի վրա կարելի է կատարել get և post request :
// post -ի body-ն պարունակելու է username, name, image դաշտերը։
// Post անելուց հետո users.json-ի պաունակությունը կարդալ ամբողյությամբ , հետո այդ json-ի մեջ ավելացնել username key-ով օբյեկ ,
// որի մեջ կա username, name և image (image-ը save արած image-ի path-ն է, multer-ի միջոցով save անել) , հետո
// փոխել json-ի պարունակությունը։ Նախքան ավելացնելը ստուգել եթե այս username-ով արդեն կա օբյեկ json ֆայլի մեջ ,
// ապա վերադարձնել res.json()-ի մեջ {success: false, data: null, message: 'username is taken'}}, հակարակ դեպքում
// վերադարձնել success-ը true , data-ն ավելացված օբյետը , իսկ message-ը "user created" :
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const router = express.Router();
const upload = require('../middlewares/upload');
const Users = require('../models/users');

router.route('/').get(async (req, res) => {
    const options = {};
    if (req.query.name) {
        options.name = req.query.name;
    }
    const users = await Users.find(options);

    // if (req.query.limit) {
    //     users = users.slice(0, req.query.limit);
    // }

    res.json(users);
}).post(upload.single('image'), async (req, res) => {
    const {username, name} = req.body;
    if(await Users.exists({username})){
        throw new Error('User exists');
    }
    const user = new Users();
    user.image = req.file.path;
    user.username = username;
    user.name = name;

    await user.save();

    res.json({
        success: true,
        data: user,
        message: 'user created'
    });
});

router.route('/:id').get(async (req, res) => {
    const user = await Users.findOne({
        _id: req.params.id
    });
    res.json(user);
}).put(upload.single('image'), async (req, res) => {
    const user = await Users.findOne({_id: req.params.id});

    if (req.body.name) {
        user['name'] = req.body.name;
    }
    if (req.file) {
        await fs.unlink(path.join(__homedir, user['image']));
        user['image'] = req.file.path;
    }
    await user.save();

    res.json(user);
}).delete(async (req, res) => {
    const user = await Users.findOne({_id: req.params.id});

    if(user){
        await user.remove();
    }
    res.json({
        success: true
    });
});

module.exports = router;
