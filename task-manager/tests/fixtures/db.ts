export {};
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user/User');
const Task = require('../../src/models/task/Task');

const userOneID = mongoose.Types.ObjectId();
const userTwoID = mongoose.Types.ObjectId();

const fakeUserOne = {
    _id: userOneID,
    name: 'Jest test User',
    email: 'jest.test@test.com',
    password: 'Sh12345()()',
    tokens: [
        {
            token: jwt.sign({ _id: userOneID }, process.env.secretToUseJWT),
        },
    ],
};
const fakeUserTwo = {
    _id: userTwoID,
    name: 'Jest test User 2',
    email: 'jest.test.222@test.com',
    password: 'Sh12345()()',
    tokens: [
        {
            token: jwt.sign({ _id: userTwoID }, process.env.secretToUseJWT),
        },
    ],
};

const fakeTaskOne = {
    _id: mongoose.Types.ObjectId(),
    description: 'Testing jest, first task',
    completed: false,
    owner: userOneID,
};
const fakeTaskTwo = {
    _id: mongoose.Types.ObjectId(),
    description: 'Testing jest, second task',
    completed: false,
    owner: userOneID,
};
const fakeTaskThree = {
    _id: mongoose.Types.ObjectId(),
    description: 'Testing jest, third task',
    completed: false,
    owner: userTwoID,
};

const setupDatabase = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await new User(fakeUserOne).save();
    await new User(fakeUserTwo).save();
    await new Task(fakeTaskOne).save();
    await new Task(fakeTaskTwo).save();
    await new Task(fakeTaskThree).save();
};

module.exports = {
    userOneID,
    fakeUserOne,
    userTwoID,
    fakeUserTwo,
    setupDatabase,
    fakeTaskOne,
    fakeTaskTwo,
    fakeTaskThree,
};
