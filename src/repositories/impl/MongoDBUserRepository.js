const User = require('../../models/User');
const UserRepository = require('../UserRepository');

const transformUser = (userDB) => {
    return {
        id: userDB._doc._id.toString(),
        name: userDB._doc.name,
        email: userDB._doc.email
    }
}

class MongoDBUserRepository {
    static register(userData) {
        return User.create(userData);

    }

    //defines the filter method with a default value
    static async filter(filtro = {}) {
        let userList = await User.find(filtro);
        if (userList) {
            userList = userList.map(u => transformUser(u))
        }

        return userList
    }

    static async searchById(userId) {
        const userDB = await User.findById(userId);
        if (userDB) {
            return transformUser(userDB);
        }

        return null
    }
}

module.exports = UserRepository(MongoDBUserRepository);