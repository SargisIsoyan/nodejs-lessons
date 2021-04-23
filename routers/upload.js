//1. Գրել ծրագիր որ թույլ կտա վերբեռնել ֆայլ և պահպանել Homework պապկայի upload պապակայում ՝
// պահպանելիս ընտրել պատահական 6-անիշ թվերից կազմված անուն:
const express = require('express');
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token');
const validationResult = require('../middlewares/validation_result');
const ImagesCtrl = require('../controllers/images.ctrl');
const upload = require('../middlewares/upload');
const Roles = require('../configs/roles');
const {body} = require('express-validator');
const router = express.Router();


router.route('/').post(
    upload.single('image'),
    responseHandler,
    validateToken([Roles.admin, Roles.moderator]),
    body('title'),
    body('description'),
    validationResult,
    async (req, res) => {
        try {
            const image = await ImagesCtrl.add({
                image: req.file ? req.file.filename: undefined,
                userId: req.decoded.userId,
                title: req.body.title,
                description: req.body.description
            });
            res.onSuccess(image);
        } catch (e){
            res.onError(e);
        }
    }
).get(
    responseHandler,
    validateToken([Roles.admin, Roles.moderator]),
    validationResult,
    async (req, res) => {
        try {
            const images = await ImagesCtrl.getAll();
            res.onSuccess(images);
        } catch (e){
            res.onError(e);
        }
    }
);

module.exports = router;
