"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jws = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const breakMiddleware = () => {
        req.isAuth = false;
        return next();
    };
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return breakMiddleware();
    }
    const token = authHeader;
    let decodedToken;
    try {
        decodedToken = jws.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        return breakMiddleware();
    }
    if (!decodedToken) {
        return breakMiddleware();
    }
    req.serviceId = decodedToken.userId;
    req.isAuth = true;
    return next();
};
//# sourceMappingURL=isAuth.js.map