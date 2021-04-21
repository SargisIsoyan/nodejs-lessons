const AppError = require('../managers/app_error');
const TokenManager = require('../managers/token-manager');


module.exports = (roles, ...params) => {
    const validator = (req, res, next) => {
        const token = req.headers['token'] || req.query['token'] || req.body['token'];
        if (token) {
            try {
                const decoded = TokenManager.decode(token);
                if (decoded.userId && decoded.action === 'login') {
                    if (Array.isArray(roles) && roles.length > 0) {
                        if (roles.includes(decoded.role)) {
                            req.decoded = decoded;
                            next();
                        } else {
                            res.onError(new AppError('Permission Denied', 401));
                        }
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                } else {
                    res.onError(new AppError('Invalid token', 401));
                }
            } catch (e) {
                res.onError(new AppError('Invalid token', 401));
            }
        } else {
            res.onError(new AppError('Auth error', 401));
        }
    }

    if (params.length > 1) {
        return validator(roles, params[0], params[1]);
    }
    return validator;
}
