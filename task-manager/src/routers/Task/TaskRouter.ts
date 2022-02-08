const express = require('express');
const router = express.Router();
import { Response, Request } from 'express';
import { TaskType } from '../../util/types/Types';
const Task = require('../../models/task/Task');

router.post('/tasks', async (req: Request, res: Response) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error: unknown) {
        res.status(400).send(error);
    }
});

router.get('/tasks', async (_req: Request, res: Response) => {
    try {
        const tasks: TaskType = await Task.find({});
        res.send(tasks);
    } catch (error: unknown) {
        res.status(500).send(error);
    }
});

router.get('/tasks/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;

    try {
        const task: TaskType = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

router.patch('/tasks/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;
    const update = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = update.every((update) => allowedUpdates.includes(update));

    if (!isValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }
    try {
        const task: TaskType = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

router.delete('/tasks/:id', async (req: Request, res: Response) => {
    const _id = req.params.id;
    try {
        const task: TaskType = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send();
        }
        return res.send(task);
    } catch (error: unknown) {
        return res.status(500).send(error);
    }
});

module.exports = router;
