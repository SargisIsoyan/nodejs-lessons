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
const UsersCtrl = require('../controllers/users-ctrl');
const ResponseManager = require('../managers/response_manager');
const {check, body} = require('express-validator');
const validationResult = require('../middlewares/validation_result');
const responseHandler = require('../middlewares/response-handler');


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
}).post(
    responseHandler,
    upload.single('image'),
    check('username').custom(value => {
        return value && value.length > 0
    }),
    body('name').exists().notEmpty().isLength({min: 6, max: 20}),
    validationResult,
    async (req, res) => {
        try {
            const {username, name} = req.body;
            const createdUser = await UsersCtrl.add({
                file: req.file,
                username,
                name
            });
            res.onSuccess(createdUser, 'User is created');
        } catch (e) {
            res.onError(e);
        }
    });

router.route('/:id').get(async (req, res) => {
    const responseHandler = ResponseManager.getResponseHandler(res);
    try {
        const user = await UsersCtrl.getById(req.params.id);
        responseHandler.onSuccess(user);
    } catch (e) {
        responseHandler.onError(e);
    }
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

    if (user) {
        await user.remove();
    }
    res.json({
        success: true
    });
});

module.exports = router;
