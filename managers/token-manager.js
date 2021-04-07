const jwt = require('jsonwebtoken');
const {privateKey} = require('../configs/private-key');

class TokenManager{
    encode(data){
        return jwt.sign(data,privateKey, {
            expiresIn: 60 * 60 * 24
        });
    }
    decode(token){
        return jwt.verify(token, privateKey);
    }
}

module.exports = new TokenManager();
