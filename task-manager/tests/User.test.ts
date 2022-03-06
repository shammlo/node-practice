export {};
const request = require('supertest');
const app = require('../src/ExpressApp');
const User = require('../src/models/user/User');

const dummyUser = {
    name: 'Jest test User',
    email: 'jest.test@test.com',
    password: 'Sh12345()()',
};
beforeEach(async () => {
    await User.deleteMany();
    await new User(dummyUser).save();
});

describe('Testing express app', () => {
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
        await request(app)
            .post('/users/login')
            .send({
                email: dummyUser.email,
                password: dummyUser.password,
            })
            .expect(200);
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
});
