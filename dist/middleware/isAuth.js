"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const isAuth = (req, res, next) => {
    const breakMiddleware = () => {
        req.isAuth = false;
        return next();
    };
    const authHeader = req.get('authorization');
    if (!authHeader) {
        return breakMiddleware();
    }
    const token = authHeader;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        return breakMiddleware();
    }
    if (!decodedToken) {
        return breakMiddleware();
    }
    req.serviceId = decodedToken.serviceId;
    req.isAuth = true;
    return next();
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map