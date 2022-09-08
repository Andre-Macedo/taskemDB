const mongoose = require("mongoose");

class MongoDBConnectionHelper {
    //defines  static method to connect to mongoDB
    //as the method is static i dont need to instance an object to use it
    static conectar() {
        // effectively connect to mongoDB
        const conexao = mongoose.connect(process.env.MONGO_DB_STRING_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        //when connection is sucessful it gives the sucess message
        mongoose.connection.on("connected", () => console.log("Connected to mongoDB"));

        // when connection fails it gives the fail message
        mongoose.connection.on("error", e => console.error("Failure to connect to mongoDB", e.message));

        return conexao;

    }
}

module.exports = MongoDBConnectionHelper;