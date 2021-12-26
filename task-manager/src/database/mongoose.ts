const mongoose = require('mongoose');

interface User {
    name: string;
    age: number;
}
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager-api';

mongoose.connect(mongoURL + '/' + dbName, {
    useNewUrlParser: true,
});

const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        trim: true,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
});

const myTask = new Task({
    description: 'Read your book',
    completed: false,
});

myTask
    .save()
    .then(() => {
        console.log(myTask);
    })
    .catch((error: Error) => {
        console.log(error);
    });

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//     },
//     age: {
//         type: Number,
//     },
// });

// const me = new User({
//     name: 'sham',
//     age: 27,
// });

// me.save()
//     .then(() => {
//         console.log(me);
//     })
//     .catch((error: Error) => {
//         console.log(error);
//     });
