export {};
const request = require('supertest');
const app = require('../src/ExpressApp');
const User = require('../src/models/user/User');
const { userOneID, fakeUserOne, setupDatabase } = require('../tests/fixtures/db');
import { describe, it, beforeEach, expect } from '@jest/globals';

beforeEach(setupDatabase);

describe('Testing User model', () => {
    it('Should signup a new user', async () => {
        await request(app)
            .post('/users')
            .send({
                name: 'Shamlo, testing jest from different database',
                email: 'shamlo.testing.2.jest.db2@test.com',
                password: 'Sh12345()()',
            })
            .expect(201);
    });

    it('Should login existing user', async () => {
        const response = await request(app)
            .post('/users/login')
            .send({
                email: fakeUserOne.email,
                password: fakeUserOne.password,
            })
            .expect(200);

        const user = await User.findById(userOneID);
        expect(user.tokens[1].token).toBe(response.body.token);
    });

    it('Should not login a non existing user', async () => {
        await request(app)
            .post('/users/login')
            .send({
                email: 'test@test.com',
                password: 'Sh12345()((',
            })
            .expect(400);
    });

    it('Should get profile for user', async () => {
        await request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send()
            .expect(200);
    });

    it('Should not get profile for unauthenticated user', async () => {
        await request(app).get('/users/me').send().expect(401);
    });

    it('Should delete account for user', async () => {
        await request(app)
            .delete('/users/me')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send()
            .expect(200);

        const user = await User.findById(userOneID);
        expect(user).toBeNull();
    });

    it('Should not delete account for unauthenticated user', async () => {
        await request(app).delete('/users/me').send().expect(401);
    });

    it('Should upload avatar image', async () => {
        await request(app)
            .post('/users/me/avatar')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .attach('avatar', 'tests/fixtures/profile-pic.jpg')
            .expect(200);

        const user = await User.findById(userOneID);
        expect(user.avatar).toEqual(expect.any(Buffer));
    });

    it('Should update valid user fields', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send({
                name: 'Shamlo, testing jest from different database',
            })
            .expect(200);

        const user = await User.findById(userOneID);
        expect(user.name).toBe('Shamlo, testing jest from different database');
    });

    it('Should not update invalid user fields', async () => {
        await request(app)
            .patch('/users/me')
            .set('Authorization', `Bearer ${fakeUserOne.tokens[0].token}`)
            .send({
                location: 'Shambala',
            })
            .expect(400);
    });
});
