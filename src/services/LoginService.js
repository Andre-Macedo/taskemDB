const jwt = require("jsonwebtoken");
const md5 = require("md5")
const UserRepository = require("../repositories/impl/MongoDBUserRepository")

class LoginService {
    async login(login, password) {
        const filtro = {
            email: login,
            password: md5(password)
        }

        let user = null;
        const users = await UserRepository.filter(filtro);
        if (users && users.length) {
            user = users[0]
        } else {
            return null;
        }

        // Create access token using the JWT
        const token = jwt.sign({
            _id: user.id
        }, process.env.SECRET_KEY_JWT)

        // returns the authenticated user info with its token
        return {
            ...user,
            token
        }
    }
}

module.exports = LoginService;