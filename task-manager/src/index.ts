const express = require('express');
// import { Response, Request } from 'express';
// import { UserType, TaskType } from './util/types/Types';
require('./database/mongoose');

const userRouter = require('./routers/User/UserRouter');
const taskRouter = require('./routers/Task/TaskRouter');
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
