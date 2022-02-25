const express = require('express');
const router = express.Router();
import { Response, Request } from 'express';
import { ReqUserType } from '../../util/types/Types';
const Task = require('../../models/task/Task');
const AuthMiddleware = require('../../middleware/auth/AuthMiddleware');
router.post('/tasks', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    // const task = new Task(req.body);
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error: unknown) {
        res.status(400).send(error);
    }
});

router.get('/tasks', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    const match: { [key: string]: boolean } = {};
    const sort: { [key: string]: number } = {};

    if (req.query.completed) {
        match.completed = req.query.completed === 'true';
    }

    if (req.query.sortBy) {
        const parts = (req.query.sortBy as string).split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    try {
        // - option one
        // const tasks = await Task.find({ owner: req.user._id });

        // - option two
        await req.user.populate!({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit as string),
                skip: parseInt(req.query.skip as string),
                sort,
            },
        });
        res.send(req.user.tasks);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.get('/tasks/:id', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

router.patch('/tasks/:id', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
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
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

router.delete('/tasks/:id', AuthMiddleware, async (req: Request & ReqUserType, res: Response) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOneAndDelete({ _id, owner: req.user._id });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

module.exports = router;
