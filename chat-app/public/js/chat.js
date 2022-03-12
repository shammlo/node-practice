import Mustache from 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.js';
const socket = io();

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const sendButton = document.querySelector('#send');
const messageList = document.querySelector('#messages_list');
const geoButton = document.querySelector('#location');
const locationTemplate = document.querySelector('#location-template').innerHTML;

// ----------------------------------------------------------------
socket.on('welcome', (message) => {
    console.log(message.text);
});
socket.on('message', (message) => {
    console.log(message.text);
});

// ----------------------------------------------------------------
// **** LOCATION TEMPLATE ****

socket.on('server-message-url', ({ text: { url, text } }) => {
    const html = Mustache.render(locationTemplate, {
        url,
        text,
    });
    messageList.insertAdjacentHTML('beforeend', html);
});

// ----------------------------------------------------------------
socket.on('server-message', (msj) => {
    const li = document.createElement('li');

    if (!msj.text) {
        return;
    }
    const html = `
        <div class="message">
            <p class="message_text">${msj.text}</p>
            <p class="message_time">${msj.createdAt && moment(msj.createdAt).format('h:mm a')}</p>
        </div>
    `;
    li.innerHTML = html;
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
            }
        );
    });
});
