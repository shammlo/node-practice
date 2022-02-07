require('../src/database/mongoose');
// const User = require('../src/models/user/User');
const Tasks = require('../src/models/task/Task');
// import { User, Task } from '../src/util/types/Types';

// User.findByIdAndUpdate('61cb6057a3ad49cf2c52ba54', { age: 1 })
//     .then((user: User) => {
//         console.log(user);

//         return User.countDocuments({ age: 1 });
//     })
//     .then((result: any) => {
//         console.log(result);
//     })
//     .catch((err: Error) => {
//         console.log(err);
//     });

// const updateAgeAndCount = async (id: string, age: number) => {
//     const user = await User.findByIdAndUpdate(id, { age });
//     const count = await User.countDocuments({ age });

//     return { user, count };
// };

// updateAgeAndCount('61cb6057a3ad49cf2c52ba54', 2)
//     .then(({ user, count }) => {
//         console.log(user);
//         console.log(count);
//     })
//     .catch((error: Error) => {
//         console.log(error.message);
//     });

const deleteTaskAndCount = async (id: string) => {
    const task = await Tasks.findByIdAndDelete(id);
    if (task === null) {
        throw new Error('Task not found.');
    }
    //     const task = await Tasks.findById(id);
    //   if(task.completed===false) {
    //       throw new Error("Task is not completed");
    //   } else {
    //     //   delete task
    //   }

    const count = await Tasks.countDocuments({ completed: false });

    return { task, count };
};

deleteTaskAndCount('61c8bc421a38251d7c36963d')
    .then(({ task, count }) => {
        console.log(task);
        console.log(count);
    })
    .catch((error: Error) => {
        console.log(error.message);
    });
