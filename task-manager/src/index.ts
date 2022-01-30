const express = require('express');
import { Response, Request } from 'express';
import { Users, Tasks } from './util/types/Types';
require('./database/mongoose');

const User = require('./models/user/User');
const Task = require('./models/task/Task');
// ----------------------------------------------------------------
const app = express();

const port = process.env.PORT || 3000;

// -------------------------------
// *** APP.USE() ***
app.use(express.json());

// -------------------------------
// *** APP.GET() ***
app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

app.post('/users', (req: Request, res: Response) => {
    const user = new User(req.body);

    user.save()
        .then(() => {
            res.status(201).send(user);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        });
});

app.get('/users/', (_req: Request, res: Response) => {
    User.find({})
        .then((users: Users) => {
            res.send(users);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        });
});

app.get('/users/:id', (req: Request, res: Response) => {
    const _id = req.params.id;

    User.findById(_id)
        .then((user: Users) => {
            if (!user) {
                return res.status(404).send();
            }
            return res.send(user);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        });
});

app.post('/tasks', (req: Request, res: Response) => {
    const task = new Task(req.body);

    task.save()
        .then(() => {
            res.status(201).send(task);
        })
        .catch((err: Error) => {
            res.status(400).send(err);
        });
});

app.get('/tasks', (_req: Request, res: Response) => {
    Task.find({})
        .then((tasks: Users) => {
            res.status(200).send(tasks);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        });
});

app.get('/tasks/:id', (req: Request, res: Response) => {
    const _id = req.params.id;

    Task.findById(_id)
        .then((task: Tasks) => {
            if (!task) {
                return res.status(404).send();
            }
            return res.send(task);
        })
        .catch((err: Error) => {
            res.status(500).send(err);
        });
});

// -------------------------------
// **** LISTENING ****
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
