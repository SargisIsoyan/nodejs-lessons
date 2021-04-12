const AppError = require('../managers/app_error');
const TokenManager = require('../managers/token-manager');

module.exports = (req, res, next) => {
    const token = req.headers['token'] || req.query['token'] || req.body['token'];
    if(token){
        try {
            const decoded = TokenManager.decode(token);
            if(decoded.userId && decoded.action === 'login'){
                req.decoded = decoded;
                next();
            } else{
                res.onError(new AppError('Invalid token', 401));
            }
        } catch (e) {
            res.onError(new AppError('Invalid token', 401));
        }
    } else{
        res.onError(new AppError('Auth error', 401));
    }
}
