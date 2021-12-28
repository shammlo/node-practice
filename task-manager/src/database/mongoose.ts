const mongoose = require('mongoose');
const validator = require('validator');

interface User {
    name: string;
    age: number;
}
interface Task {
    description: string;
    completed: boolean;
}
// ----------------------------------------------------------------
// * MongoDB URL and Database name
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager-api';

mongoose.connect(mongoURL + '/' + dbName, {
    useNewUrlParser: true,
});

const User = mongoose.model('User', {
    name: {
        type: String,
        trim: true,
        required: true,
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        },
    },
    password: {
        type: String || Number,
        required: true,
        minlength: 8,
        trim: true,
        validate(value: string) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
            if (!validator.isPassword(value)) {
                throw new Error('Password must contain at least one number');
            }
        },
    },
    age: {
        type: Number,
        default: 0,
    },
});

const me = new User({
    name: '  shamm  ',
    email: 'SHAM@testing.com   ',
    password: '123',
});

me.save()
    .then(() => {
        console.log(me);
    })
    .catch((error: Error) => {
        console.log(error);
    });

// ----------------------------------------------------------------
// - Task

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

// myTask
//     .save()
//     .then(() => {
//         console.log(myTask);
//     })
//     .catch((error: Error) => {
//         console.log(error);
//     });
