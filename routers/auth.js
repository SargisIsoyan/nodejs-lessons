const express = require('express');
const router = express.Router();
const responseHandler = require('../middlewares/response-handler');
const validateToken = require('../middlewares/validate-token');
const {body} = require('express-validator');
const validationResult = require('../middlewares/validation_result');
const AuthCtrl = require('../controllers/auth-ctrl');
const UserCtrl = require('../controllers/users-ctrl');

router.post(
    '/register',
    responseHandler,
    body('email').isEmail(),
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
    body('email').isEmail(),
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

router.post(
    '/activate',
    responseHandler,
    body('token').exists(),
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.activate(req.body);
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
);

router.post(
    '/forgot-password',
    responseHandler,
    body('email').isEmail(),
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.forgotPassword(req.body);
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
);

router.post(
    '/reset-password',
    responseHandler,
    body('password').exists(),
    body('token').exists(),
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.resetPassword(req.body);
            res.onSuccess({}, 'Password updated');
        } catch (e) {
            res.onError(e);
        }
    }
);

router.post(
    '/init-session',
    responseHandler,
    validateToken,
    async (req, res) => {
        try {
            const user = await UserCtrl.getById(req.decoded.userId)
            res.onSuccess(user);
        } catch (e) {
            res.onError(e);
        }
    }
);

module.exports = router;
