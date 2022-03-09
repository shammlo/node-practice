export {};
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
// import { Request, Response } from 'express';
import { Socket } from 'socket.io';
// ----------------------------------------------------------------
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection', (socket: Socket) => {
    console.log('New user connected');

    socket.emit('welcome', 'Welcome to Socket.io test server');

    socket.on('cl-message', (msj: string) => {
        console.log('Client message received');
        io.emit('message', msj);
    });
});

// --------------------------------

server.listen(port, () => {
    console.log(`Server started on port ${port}, linked to http://localhost:${port}`);
});
