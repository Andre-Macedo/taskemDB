const User = require("../../models/User");
const UserRepository = require("../UserRepository");

class MongoDBUserRepository {
    static register(userData) {
        return User.create(userData);

    }

    //defines the filter method with a default value
    static filter(filtro = {}) {
        return User.find(filtro);
    }
}

module.exports = UserRepository(MongoDBUserRepository);