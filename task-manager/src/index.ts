const express = require('express');
const jwt = require('jsonwebtoken');
require('./database/mongoose');
const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routers/User/UserRouter');
const taskRouter = require('./routers/Task/TaskRouter');

// import { Request, Response, NextFunction } from 'express';
// ----------------------------------------------------------------
const app = express();

const port = process.env.PORT || 3001;

// -------------------------------
// *** APP.USE() ***

// app.use((req: Request, res: Response, next: NextFunction) => {
//     if (req.method) {
//         res.status(503).send('Service Unavailable');
//     }
//     next();
// });

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// -------------------------------
// **** LISTENING ****
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const myFunction = async () => {
    const token = jwt.sign({ _id: 'abc123' }, process.env.secretToUseJWT, { expiresIn: '7 days' });

    const data = jwt.verify(token, process.env.secretToUseJWT);

    return data;
};

myFunction();
