require('../src/database/mongoose');
// const User = require('../src/models/user/User');
const Tasks = require('../src/models/task/Task');
import { Tasks } from '../src/util/types/Types';

// User.findByIdAndUpdate('61cb6057a3ad49cf2c52ba54', { age: 1 })
//     .then((user: Users) => {
//         console.log(user);

//         return User.countDocuments({ age: 1 });
//     })
//     .then((result: any) => {
//         console.log(result);
//     })
//     .catch((err: Error) => {
//         console.log(err);
//     });

Tasks.findByIdAndDelete('61cb5e1502be96bb018bca1f', { completed: true })
    .then((task: Tasks) => {
        console.log(task);

        return Tasks.countDocuments({ completed: false });
    })
    .then((result: any) => {
        console.log(result);
    })
    .catch((err: Error) => {
        console.log(err);
    });
