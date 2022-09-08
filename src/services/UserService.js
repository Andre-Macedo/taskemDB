const UserRepository = require("../repositories/impl/MongoDBUserRepository")

class UserService {
    async register(userData) {
        const listErrors = [];

        if (!userData.name || !userData.name.toString().trim()) {
            listErrors.push("Username invalid")
        } else {
            const parsedName = parseInt(userData.name);
            const isANumber = !Number.isNaN(parsedName);
            if (isANumber) {
                listErrors.push("Invalid Username")
            }
        }


        if (!userData.email || !userData.email.toString().trim()) {
            listErrors.push("Email invalid");
        } else {
            const hasAt = userData.email.indexOf("@") !== -1;
            const hasDot = userData.email.indexOf(".") !== -1;

            if (!hasAt || !hasDot) {
                listErrors.push("User email invalid")
            } else {
                //filters in database users with equal emails
                const userWithSameEmail = await UserRepository.filter({
                    email: userData.email
                });

                if (userWithSameEmail && userWithSameEmail.length) {
                    listErrors.push("Already exists a user with this email.")
                }
            }
        }


        if (!userData.password || !userData.password.trim()) {
            listErrors.push("Invalid password")
        }

        const retorno = {
            errors: null,
            user: null
        };

        if (listErrors.length) {
            retorno.errors = listErrors;
        } else {
            //registers the user
            const userRegistered = await UserRepository.register({
                name: userData.name,
                email: userData.email,
                password: userData.password
            });

            retorno.user = userRegistered;
        }

        return retorno;
    }
}

module.exports = UserService;