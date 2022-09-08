const jwt = require("jsonwebtoken");
const UserRepository = require("../repositories/impl/MongoDBUserRepository")

//defines the public routes list of the app
const publicRoutes = [
    {
        url: "/api/login",
        method: "POST"
    },
    {
        url: "/api/docs*",
        method: "GET"
    },
    {
        url: "/api/user",
        method: "POST"
    }
]

module.exports = (req, res, next) => {
    req.logger.info("verify permission and access to route", `route=${req.url}`);

    //verifies if the request is from a public route
    const publicRoute = publicRoutes.find(route => {
        const publicRouteHasWildcard = route.url.indexOf("*") !== -1;
        const urlRequestHasPartOfThePublicRoute = req.url.indexOf(route.url.replace("*", '')) !== -1;
        return (
            //parenthesis defines the priority to verify the conditions
            route.url === req.url
            || (
                publicRouteHasWildcard
                && urlRequestHasPartOfThePublicRoute
            )
        )
            && route.method === req.method.toUpperCase()
    }

    );
    if (publicRoute) {
        req.logger.info("public route, access cleared")

        return next();
    }


    const authorization = req.headers.authorization;
    //verifies if there is a authorization header
    if (!authorization) {
        req.logger.info("access negated, no authorization header found")
        //htt status 401 access negated
        return res.status(401).json({
            status: 401,
            error: 'access negated, you must send the authorization header'
        });
    }

    //fetchs the authorization token and extracts the "Bearer" prefix
    //returns the string from the eight character onwards
    const token = authorization.substr(7);
    if (!token) {
        req.logger.info("request without access token");
        return res.status(401).json({
            status: 401,
            error: "access denied, authorization token not informed"
        })
    }

    //verify if the token is valid and was generated using our secret key
    jwt.verify(token, process.env.SECRET_KEY_JWT, async (error, decoded) => {
        if (error) {
            req.logger.error("Failure to decode the access token.", `token=${token}`);
            return res.status(401).json({
                status: 401,
                error: "access denied, failure to decode the access token"
            });
        }

        req.logger.debug("token jwt decodificado", `idUser=${decoded._id}`);
        //TODO:  load users from the database
        const user = await UserRepository.searchById(decoded._id);
        if (!user) {
            req.logger.error("User not found in the database.", `id=${decoded._id}`);
            return res.status(401).json({
                status: 401,
                error: "access denied, user not found"
            });
        }

        //gives the propertie user from the request to the authenticated user
        req.user = user;
        next();
    });


}