const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
require('./database/mongoose');

const userRouter = require('./routers/User/UserRouter');
const taskRouter = require('./routers/Task/TaskRouter');

// import { Request, Response, NextFunction } from 'express';
// ----------------------------------------------------------------
const app = express();

const port = process.env.PORT || 3000;

// -------------------------------
// *** APP.USE() ***

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// -------------------------------
// **** LISTENING ****
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
