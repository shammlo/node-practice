export {};
const mongoose = require('mongoose');
const validator = require('validator');

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
        },
    },
    age: {
        type: Number,
        default: 0,
        validate(value: number) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        },
    },
});

module.exports = User;