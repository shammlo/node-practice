export {};
const mongoose = require('mongoose');

// ----------------------------------------------------------------
// * MongoDB URL and Database name
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager-api';

mongoose.connect(mongoURL + '/' + dbName, {
    useNewUrlParser: true,
});

// ----------------------------------------------------------------
// - Task

// const Task = mongoose.model('Tasks', {
//     description: {
//         type: String,
//         trim: true,
//         required: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// });

// const myTask = new Task({
//     description: 'Read your book',
//     completed: false,
// });

// myTask
//     .save()
//     .then(() => {
//         console.log(myTask);
//     })
//     .catch((error: Error) => {
//         console.log(error);
//     });
