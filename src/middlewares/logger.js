module.exports = (req, res, next) => {
    //generates a random number for the request and rounds up to a integer
    const traceId = Math.ceil(Math.random() * 999999999999);
    const logger = {
        error: (message, ...extraParams) => {
            console.error(`[ERROR] traceId=${traceId}, msg=${message}`, ...extraParams);
        },
        debug: (message, ...extraParams) => {
            console.log(`[DEBUG] traceId=${traceId}, msg=${message}`, ...extraParams);
        },
        info: (message, ...extraParams) => {
            console.info(`[INFO]traceId=${traceId}, msg=${message}`, ...extraParams);
        }
    }

    logger.info(`requisition received`, `url= ${req.url}`, `http method = ${req.method}`);

    //create a logger propertie in the req object and assign the logger object that we just made.
    req.logger = logger;
    next();
}