const UserCtrl = require('./users-ctrl');
const AppError = require('../managers/app_error');
const Bcrypt = require('../managers/bcrypt');
const TokenManager = require('../managers/token-manager');

class AuthCtrl{
    async register(data){
        return UserCtrl.add(data);
    }

    async login(data){
        const {username, password} = data;
        const user = await UserCtrl.getOne({username});

        if(user && await Bcrypt.compare(password, user.password)){
            return TokenManager.encode({
                userId: user._id
            });
        }

        throw new AppError('Username or password is invalid', 401);
    }
}

module.exports = new AuthCtrl();
