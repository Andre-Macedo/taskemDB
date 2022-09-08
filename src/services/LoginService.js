const jwt = require("jsonwebtoken");

class LoginService {
    login(username, password) {
        //TODO: verify if the user is registered on the database
        const user = {
            id: 1,
            name: "Fake User",
            email: "email@blabla.com"
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