//fetchs at project root the .env file that contains ambient variables
require("dotenv").config();

const App = require("./src/App");

const app = new App();
app.start();

