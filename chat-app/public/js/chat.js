const socket = io();

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const sendButton = document.querySelector('#send');
const messageList = document.querySelector('#messages');
const geoButton = document.querySelector('#location');
socket.on('welcome', (message) => {
    console.log('Welcome to the chat app', message);
});
socket.on('message', (message) => {
    console.log(message);
});
socket.on('server-message', (msj) => {
    if (!msj) {
        return;
    }
    const li = document.createElement('li');
    li.innerHTML = msj;
    messageList.appendChild(li);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendButton.setAttribute('disabled', 'disabled');
    socket.emit('client-message', input.value, (message = 'Message delivered!') => {
        console.log(message);
        sendButton.removeAttribute('disabled');
    });
    input.value = '';
    input.focus();
});

geoButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
        geoButton.setAttribute('disabled', 'disabled');
        socket.emit(
            'geo-message',
            {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            },
            (error) => {
                if (error) {
                    return console.log(error);
                }
                geoButton.removeAttribute('disabled');
                console.log('Location shared!');
            }
        );
    });
});
