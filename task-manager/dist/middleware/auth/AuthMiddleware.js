"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('../../models/user/User');
const jwt = require('jsonwebtoken');
const AuthMiddleware = async (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.secretToUseJWT);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
module.exports = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map