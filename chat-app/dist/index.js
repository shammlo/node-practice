"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users/Users');
const { generateMessage } = require('./utils/messages/Messages');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3001;
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));
app.use(express.json());
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('join', ({ username, room }, callback) => {
        const { user, error } = addUser({ id: socket.id, username, room });
        if (error) {
            return callback(error);
        }
        socket.join(user.room);
        socket.emit('welcome', generateMessage(user.username, 'Welcome to the chat app', { username: user.username }));
        socket.broadcast
            .to(user.room)
            .emit('message', generateMessage(user.username, `${user.username} joined`));
        io.to(user.room).emit('room.users', {
            room: user.room,
            users: getUsersInRoom(user.room),
        });
        callback();
    });
    socket.on('client-message', (text, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            console.log('User not found');
        }
        socket.broadcast.to(user.room).emit('render-message', generateMessage(user.username, text));
        callback();
    });
    socket.on('geo-message', (geo, callback) => {
        const user = getUser(socket.id);
        if (!user) {
            console.log('User not found');
        }
        socket.broadcast.to(user.room).emit('server-message-url', generateMessage({
            url: `https://www.google.com/maps/@${geo.latitude},${geo.longitude},13z`,
            text: 'This is my current location',
            geolocation: true,
        }));
        callback();
    });
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left`));
            io.to(user.room).emit('room.users', {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }
    });
});
app.get('/chat', (_req, res) => {
    res.sendFile(path.join(publicDirectoryPath, 'chat.html'));
});
server.listen(port, () => {
    console.log(`Server started on port ${port}, linked to http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map