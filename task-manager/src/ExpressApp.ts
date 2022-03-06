export {};
const express = require('express');

require('./database/mongoose');

const userRouter = require('./routers/User/UserRouter');
const taskRouter = require('./routers/Task/TaskRouter');

// import { Request, Response, NextFunction } from 'express';
// ----------------------------------------------------------------
const app = express();

// -------------------------------
// *** APP.USE() ***

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// -------------------------------

module.exports = app;
