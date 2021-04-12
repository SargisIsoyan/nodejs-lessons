const jwt = require('jsonwebtoken');
const {privateKey} = require('../configs/private-key');

class TokenManager{
    encode(data, expiresIn = 60 * 60 * 24){
        return jwt.sign(data,privateKey, {
            expiresIn
        });
    }
    decode(token){
        return jwt.verify(token, privateKey);
    }
}

module.exports = new TokenManager();
