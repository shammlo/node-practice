"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const sharp = require('sharp');
const { welcomeMessage, goodbyeMessage } = require('../../emails/Account');
const AuthMiddleware = require('../../middleware/auth/AuthMiddleware');
const User = require('../../models/user/User');
const multer = require('multer');
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        welcomeMessage(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
router.post('/users/logout', AuthMiddleware, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
        await req.user.save();
        res.status(200).send('Logged out');
    }
    catch (error) {
        res.status(500).send(error);
    }
});
router.post('/users/logout-all', AuthMiddleware, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send('Logged out of all devices');
    }
    catch (error) {
        res.status(500).send(error);
    }
});
router.get('/users/me', AuthMiddleware, async (req, res) => {
    res.send(req.user);
});
const avatar = multer({
    limits: {
        fileSize: 1000000,
    },
    fileFilter(_req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a valid image'));
        }
        callback(undefined, true);
    },
});
router.post('/users/me/avatar', AuthMiddleware, avatar.single('avatar'), async (req, res) => {
    var _a;
    const buffer = await sharp((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer)
        .resize({ width: 250, height: 250 })
        .png()
        .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, _req, res, _next) => {
    res.status(400).send({ error: error.message });
});
router.delete('/users/me/avatar', AuthMiddleware, async (req, res) => {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});
router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user || !user.avatar) {
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }
    catch (error) {
        res.status(404).send(error.message);
    }
});
router.patch('/users/me', AuthMiddleware, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        return res.send(req.user);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
router.delete('/users/me', AuthMiddleware, async (req, res) => {
    var _a;
    try {
        await ((_a = req.user) === null || _a === void 0 ? void 0 : _a.remove());
        goodbyeMessage(req.user.email, req.user.name);
        return res.send(req.user);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});
module.exports = router;
//# sourceMappingURL=UserRouter.js.map