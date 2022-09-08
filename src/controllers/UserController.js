const HttpController = require("./HttpController");

class UserController extends HttpController {
    configRoutes(baseUrl) {
        //defines the route to register user
        this.express.post(`${baseUrl}/user`, this.register.bind(this));

    }

    register(req, res) {
        const userDate = req.body;

        req.logger.info("user registered sucessfully");

        res.json(userDate);

    }
}

module.exports = UserController;