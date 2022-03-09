const socket = io();

const input = document.querySelector('#input');
const button = document.querySelector('#send');
const messageList = document.querySelector('#messages');

socket.on('welcome', (message) => {
    console.log('Welcome to the chat app', message);
});
socket.on('message', (msj) => {
    console.log(msj);
    const li = document.createElement('li');
    li.innerHTML = msj;
    messageList.appendChild(li);
});

button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Sending message', input.value);
    socket.emit('cl-message', input.value);
    input.value = '';
});
