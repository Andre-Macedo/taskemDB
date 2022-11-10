const express = require('express');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const TaskController = require('./controllers/TaskController')
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger.json');
const AppConstants = require('./enum/AppConstants');
const MongoDBConnectionHelper = require('./helper/MongoDBConnectionHelper')

const logger = require('./middlewares/logger')
const jwt = require('./middlewares/jwt')
const cors = require('./middlewares/cors');


class App {
    #controllers;

    start() {
        //config express
        this.#configExpress();
        //config the connection with dbs
        this.#configDatabases();
        //load controllers
        this.#loadControllers();
        //init server
        this.#initServer();

    }

    #configExpress() {
        //create express instance to manage the server
        this.express = express();


        //registers the middleware that makes the requests logs
        this.express.use(logger)

        //registers the middlewares to convert the api requests
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.json());

        // registers the middleware to enable requests from other domains
        this.express.use(cors);

        //register the middleware jwt to make the validation to access the routes
        this.express.use(jwt)

        //configures the swagger of the app to serve the docs
        this.express.use(
            `${AppConstants.BASE_API_URL}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(swaggerFile)
        );


    };

    #configDatabases() {
        MongoDBConnectionHelper.conectar();
    };


    #loadControllers() {
        //gives the propriety #controllers the list of constrollers available in the app
        this.#controllers = [
            new LoginController(this.express),
            new UserController(this.express),
            new TaskController(this.express)
        ]
    }

    #initServer() {
        // tries to fetch the port thrught our ambient variable EXPRESS_PORT
        // if its not defined it uses 3001.
        const port = process.env.EXPRESS_PORT || 3001;
        this.express.listen(port, () => {
            console.log(`Server running on ${port}`)
        })
    }

};

module.exports = App;