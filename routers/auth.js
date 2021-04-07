const express = require('express');
const router = express.Router();
const responseHandler = require('../middlewares/response-handler');
const {body} = require('express-validator');
const validationResult = require('../middlewares/validation_result');
const AuthCtrl = require('../controllers/auth-ctrl');

router.post(
    '/register',
    responseHandler,
    body('username').exists(),
    body('password').exists().isLength({min: 6}),
    body('name').exists(),
    validationResult,
    async (req, res) => {
        try {
            const user = await AuthCtrl.register(req.body);
            res.onSuccess(user);
        } catch (e) {
            res.onError(e);
        }
    }
);

router.post(
    '/login',
    responseHandler,
    body('username').exists(),
    body('password').exists(),
    validationResult,
    async (req, res) => {
        try {
            const token = await AuthCtrl.login(req.body);
            res.onSuccess(token);
        } catch (e) {
            res.onError(e);
        }
    }
);

module.exports = router;
