export {};
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('../task/Task');
const userSchema = new mongoose.Schema(
    {
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
            unique: true,
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
        tokens: [
            {
                token: {
                    type: String,
                    required: true,
                },
            },
        ],
        avatar: {
            type: Buffer,
        },
    },
    { timestamps: true }
);

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner',
});

userSchema.methods.toJSON = function (this: typeof userSchema) {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
};

userSchema.methods.generateAuthToken = async function (this: typeof userSchema) {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.secretToUseJWT);
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

// - Hashing the password before saving it to the database
userSchema.pre('save', async function (this: typeof userSchema, next: any) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// - Deleting all tasks associated with the user before deleting the user
userSchema.pre('remove', async function (this: typeof userSchema, next: any) {
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
