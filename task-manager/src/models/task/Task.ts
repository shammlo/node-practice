const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        description: {
            type: String,
            trim: true,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    { timestamps: true }
);

// taskSchema.pre('save', async function (this: typeof taskSchema, next: any) {
//     // const task = this;

//     next();
// });

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
