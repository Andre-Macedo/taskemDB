const HttpController = require("./HttpController");
const LoginService = require("../services/LoginService");

class LoginController extends HttpController {
    //overwrites the method of the HttpController class.
    configRoutes(baseUrl) {
        //defines the route and the handler of the login class
        //passes the login method as reference and informs
        //that the context to be interpreted is from the object with LoginController class
        this.express.post(`${baseUrl}/login`, this.login.bind(this));
    };

    login(req, res) {
        //changes the request body to a variable body
        var body = req.body;

        //validates if the login and password fields were passed on the body
        if (!body || !body.login || !body.password) {
            req.logger.info("login reques invalid.")
            //returs an error saying that the login parameters are invalid
            return res.status(400).json({
                status: 400,
                error: "Invalid login parameters!"
            });
        }

        const service = new LoginService();
        const result = service.login(body.login, body.password);

        req.logger.info("Login request susscess", `result=${JSON.stringify(result)}`)
        //returns the login response mocked em json format
        res.json(result);
    }
};

module.exports = LoginController;