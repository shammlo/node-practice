export {};
const request = require('supertest');
const app = require('../src/ExpressApp');
const Task = require('../src/models/task/Task');
const {
    fakeUserOne,
    fakeUserTwo,
    setupDatabase,
    fakeTaskOne,
    // fakeTaskTwo,
    // fakeTaskThree,
} = require('../tests/fixtures/db');

import { describe, it, beforeEach, expect } from '@jest/globals';

beforeEach(setupDatabase);

describe('Testing Task model', () => {
    it('Should create task for user', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send({
                description: 'Testing jest from different database',
            })
            .expect(201);

        const task = await Task.findById(response.body._id);
        expect(task).not.toBeNull();
    });

    it('Should get all tasks for user one', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send()
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    it('Should not delete other users task', async () => {
        await request(app)
            .delete(`/tasks/${fakeTaskOne._id}`)
            .set('Authorization', `Bearer ${fakeUserTwo.tokens[0].token}`)
            .send()
            .expect(404);

        const task = await Task.findById(fakeTaskOne._id);
        expect(task).not.toBeNull();
    });
});
//
// User Test Ideas
//
// Should not signup user with invalid name/email/password
// Should not update user if unauthenticated
// Should not update user with invalid name/email/password
// Should not delete user if unauthenticated

//
// Task Test Ideas
//
// Should not create task with invalid description/completed
// Should not update task with invalid description/completed
// Should delete user task
// Should not delete task if unauthenticated
// Should not update other users task
// Should fetch user task by id
// Should not fetch user task by id if unauthenticated
// Should not fetch other users task by id
// Should fetch only completed tasks
// Should fetch only incomplete tasks
// Should sort tasks by description/completed/createdAt/updatedAt
// Should fetch page of tasks
