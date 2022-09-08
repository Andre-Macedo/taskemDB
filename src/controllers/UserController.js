const HttpController = require("./HttpController");
const UserService = require("../services/UserService");

class UserController extends HttpController {
    configRoutes(baseUrl) {
        //defines the route to register user
        this.express.post(`${baseUrl}/user`, this.register.bind(this));

    }

    async register(req, res) {
        const userData = req.body;

        try {
            const service = new UserService();
            const returnService = await service.register(userData)

            if (returnService.errors) {
                return res
                    .status(400)
                    .json({
                        status: 400,
                        error: returnService.errors.join(", ")
                    })
            }

            req.logger.info("user registered sucessfully");
            res.json({
                msg: "User created succesfully"
            });
        } catch (error) {
            req.logger.error("error to register user=" + error.message);
            res.status(500).json({
                error: "An error has ocurred while regsitering the user",
                status: 500
            });

        }


    }
}

module.exports = UserController;