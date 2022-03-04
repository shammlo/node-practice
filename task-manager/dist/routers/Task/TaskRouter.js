"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const Task = require('../../models/task/Task');
const AuthMiddleware = require('../../middleware/auth/AuthMiddleware');
router.post('/tasks', AuthMiddleware, async (req, res) => {
    const task = new Task(Object.assign(Object.assign({}, req.body), { owner: req.user._id }));
    try {
        await task.save();
        res.status(201).send(task);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
router.get('/tasks', AuthMiddleware, async (req, res) => {
    const match = {};
    const sort = {};
    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort,
            },
        });
        res.send(req.user.tasks);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/tasks/:id', AuthMiddleware, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
router.patch('/tasks/:id', AuthMiddleware, async (req, res) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = update.every((update) => allowedUpdates.includes(update));
    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        update.forEach((update) => (task[update] = req.body[update]));
        await task.save();
        return res.send(task);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
router.delete('/tasks/:id', AuthMiddleware, async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    }
    catch (error) {
        return res.status(500).send(error);
    }
});
module.exports = router;
//# sourceMappingURL=TaskRouter.js.map