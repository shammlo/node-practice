import { UsersType } from '../types/Types';
const users: UsersType[] = [];

const addUser = ({ id, username, room }: UsersType) => {
    // Clean the data
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the data
    if (!username || !room) {
        return {
            error: 'Username and room are required!',
        };
    }

    // Check for existing user
    const existingUser = users.find(
        (user: UsersType) => user.room === room && user.username === username
    );
    if (existingUser) {
        return {
            error: 'Username is in use!',
        };
    }

    // Store user
    const user = { id, username, room };
    users.push(user);
    return { user };
};
// ----------------------------------------------------------------
// *** REMOVE A USER ***
const removeUser = (id: string | number) => {
    const index = users.findIndex((user: UsersType) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return index;
};

//----------------------------------------------------------------
// *** GET USER ***
const getUser = (id: string | number) => {
    return users.find((user: UsersType) => user.id === id);
};
// ----------------------------------------------------------------
// *** GET USERS IN ROOM ***
const getUsersInRoom = (room: string) => {
    room = room.trim().toLowerCase();
    return users.filter((user: UsersType) => user.room === room);
};

// ----------------------------------------------------------------

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};
