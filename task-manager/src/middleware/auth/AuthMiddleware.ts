const User = require('../../models/user/User');
const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
import { ReqUserType } from '../../util/types/Types';

const AuthMiddleware = async (req: Request & ReqUserType, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.secretToUseJWT);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};

module.exports = AuthMiddleware;
