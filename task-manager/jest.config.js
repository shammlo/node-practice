/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

require('dotenv').config({ path: './test.env' });

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
};
