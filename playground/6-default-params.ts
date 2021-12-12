// Learning default params

type userType = {
    age?: number;
    location?: string;
};
const greeting = (name: string = 'user') => {
    console.log('Hello ' + name + '!');
};

greeting();

const userInfo: userType = {
    age: 26,
    location: 'Kurdistan',
};
const greeting2 = (name: string = 'user', { age = 1000, location = 'USA' }: userType = {}) => {
    console.log(
        'Hello ' + name + '! You are ' + age + ' years old and you live in ' + location + '!'
    );
};
greeting2('John');
