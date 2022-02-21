const express = require('express');
const router = express.Router();
import { Response, Request } from 'express';
import { UserType, ReqUserType } from '../../util/types/Types';
const AuthMiddleware = require('../../middleware/auth/AuthMiddleware');
const User = require('../../models/user/User');

router.post('/users', async (req: Request, res: Response) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error: unknown) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);

        const token = await user.generateAuthToken();

        res.status(200).send({ user, token });
    } catch (error: any) {
        res.status(400).send(error.message);
    }
});

router.post('/users/logout', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    try {
        req.user.tokens = req.user.tokens.filter((token: any) => token.token !== req.token);

        await req.user.save!();
        res.status(200).send('Logged out');
    } catch (error: unknown) {
        res.status(500).send(error);
    }
});

router.get('/users/me', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    res.send(req.user);
});

router.get('/users/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
        const user: UserType = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        return res.send(user);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

router.patch('/users/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        // const user = await User.findByIdAndUpdate(_id, req.body, {
        //     new: true,
        //     runValidators: true,
        // });

        const user = await User.findById(_id);

        updates.forEach((update) => (user[update] = req.body[update]));

        await user.save();

        if (!user) {
            return res.status(404).send();
        }
        return res.send(user);
    } catch (error: any) {
        return res.status(500).send(error.message);
    }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
        const user: UserType = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }
        return res.send(user);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});
module.exports = router;
