const bcrypt = require('bcrypt');

class Bcrypt {
    static async hash(password) {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    static async compare(password , hash){
        return bcrypt.compare(password, hash);
    }
}

module.exports = Bcrypt;
