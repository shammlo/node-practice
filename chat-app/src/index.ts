export {};
const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const Filters = require('bad-words');

const { generateMessage } = require('./utils/messages/Messages');
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

    socket.emit('welcome', generateMessage('Welcome to the chat app'));
    socket.broadcast.emit('message', generateMessage('New user joined'));

    socket.on('client-message', (msj: string, callback: (message?: string) => void) => {
        const filter = new Filters();
        if (filter.isProfane(msj)) {
            callback('Profanity is not allowed');
            return io.emit('server-message', false);
        }
        io.emit('server-message', generateMessage(msj));
        callback();
    });

    // ----------------------------------------------------------------
    // *** GEO LOCATION ***
    socket.on(
        'geo-message',
        (geo: { latitude: number; longitude: number }, callback: (message?: string) => void) => {
            io.emit(
                'message',
                generateMessage(`https://www.google.com/maps/@${geo.latitude},${geo.longitude},13z`)
            );

            io.emit(
                'server-message-url',

                generateMessage({
                    url: `https://www.google.com/maps/@${geo.latitude},${geo.longitude},13z`,
                    text: 'This is my current location',
                })
            );
            callback();
        }
    );
    // ----------------------------------------------------------------
    // *** DISCONNECT ***
    socket.on('disconnect', () => {
        io.emit('message', generateMessage('User disconnected'));
    });
});

// --------------------------------

server.listen(port, () => {
    console.log(`Server started on port ${port}, linked to http://localhost:${port}`);
});
