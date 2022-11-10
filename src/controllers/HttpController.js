const AppConstants = require('../enum/AppConstants');

class HttpController {
    constructor(instanceExpress) {
        if (!instanceExpress) {
            throw new Error('Express instance is required!');
        }

        this.express = instanceExpress;
        this.configRoutes(AppConstants.BASE_API_URL);
    }

    configRoutes(baseUrl) {
        throw new Error('configRoutes method must be implemented!')
    }

}

module.exports = HttpController;