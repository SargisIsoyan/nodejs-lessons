const UserCtrl = require('./users-ctrl');
const AppError = require('../managers/app_error');
const Bcrypt = require('../managers/bcrypt');
const TokenManager = require('../managers/token-manager');
const emailManager = require('../managers/email');
const Roles = require('../configs/roles');

class AuthCtrl {
    async generateAdmin(){
        try {
            await UserCtrl.add({
                name: 'admin',
                email: 'admin',
                password: '123456',
                role: 'admin'
            });
        } catch (e) {
            console.error(e);
        }
    }

    async register(data) {
        const user = await UserCtrl.add(data);

        const token = TokenManager.encode({
            userId: user._id,
            action: 'register'
        }, 3600);
        await emailManager.sendEmail(user.email, 'Thank you for registration',
            `<a href="http://localhost:3000/activate.html?token=${token}">Activate profile</a>`
        );
    }

    async forgotPassword(data) {
        const {email} = data;
        const user = await UserCtrl.getOne({email});

        if (user) {
            const token = TokenManager.encode({
                userId: user._id,
                action: 'reset'
            }, 3600);

            await emailManager.sendEmail(user.email, 'Reset Pass',
                `<a href="http://localhost:3000/reset-pass.html?token=${token}">Reset Password</a>`
            );

            user.resetPassToken = token;
            return user.save();
        }

        throw new AppError('User not found', 404);
    }

    async login(data) {
        const {email, password} = data;
        const user = await UserCtrl.getOne({email});

        if (user && await Bcrypt.compare(password, user.password)) {
            if (!user.isActive) {
                throw new AppError('Profile is not active', 401);
            }
            return TokenManager.encode({
                userId: user._id,
                action: 'login',
                role: user.role
            });
        }

        throw new AppError('Username or password is invalid', 401);
    }

    async adminLogin(data) {
        const {email, password} = data;
        const user = await UserCtrl.getOne({email});

        if (user && await Bcrypt.compare(password, user.password)) {
            if (!user.isActive || ![Roles.admin, Roles.moderator].includes(user.role)) {
                throw new AppError('Permission denied', 401);
            }
            return TokenManager.encode({
                userId: user._id,
                action: 'login',
                role: user.role
            });
        }

        throw new AppError('Username or password is invalid', 401);
    }

    async activate(data) {
        const {token} = data;
        const decoded = TokenManager.decode(token);

        if (decoded.userId && decoded.action === 'register') {
            const user = await UserCtrl.getById(decoded.userId);

            if (user) {
                if (user.isActive) {
                    throw new AppError('User profile is active', 401);
                }
                user.isActive = true;

                return user.save();
            }
        }

        throw new AppError('invalid token', 401);
    }

    async resetPassword(data) {
        const {token, password} = data;
        const decoded = TokenManager.decode(token);

        if (decoded.userId && decoded.action === 'reset') {
            const user = await UserCtrl.getById(decoded.userId);

            if (user && user.resetPassToken === token) {
                user.password = await Bcrypt.hash(password);
                user.resetPassToken = undefined;

                return user.save();
            }
        }

        throw new AppError('invalid token', 401);
    }
}

module.exports = new AuthCtrl();
