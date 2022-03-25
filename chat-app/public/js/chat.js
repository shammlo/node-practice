import Mustache from 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.js';
const socket = io();

const form = document.querySelector('#form');
const chatInput = document.querySelector('#chat-input');
const loginInput = document.querySelector('.input');
const sendButton = document.querySelector('#send');
const geoButton = document.querySelector('#location');
const locationTemplate = document.querySelector('#location-template').innerHTML;
const locationTemplateServer = document.querySelector('#location-template-server').innerHTML;
const messageList = document.querySelector('#messages_list');
const msgTemplateClient = document.querySelector('#message-template-client').innerHTML;
const msgTemplateServer = document.querySelector('#message-template-server').innerHTML;
const profile = document.querySelector('.profile');

// ----------------------------------------------------------------

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

// ----------------------------------------------------------------
socket.on('welcome', (message) => {
    const html = `
    <h3 class="">
        ${message.option.username}
    </h3>
    `;
    profile.classList.add('bg-gr-100');
    profile.insertAdjacentHTML('afterbegin', html);
    console.log(message.text + ' ' + message.option.username);
});
socket.on('message', (message) => {
    console.log(message.text);
});

// ----------------------------------------------------------------
// **** LOCATION TEMPLATE ****

socket.on('server-message-url', ({ text: { url, text, geolocation }, createdAt }) => {
    addMessage(
        {
            url,
            text,
            geolocation,
            createdAt: moment(createdAt).format('h:mm a'),
        },
        false
    );
});

// ----------------------------------------------------------------
socket.on('render-message', (msj) => {
    addMessage(msj, false);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendButton.setAttribute('disabled', 'disabled');

    if (chatInput.value.trim() === '') {
        sendButton.removeAttribute('disabled');
        return;
    }
    socket.emit('client-message', chatInput.value, (message = 'Message delivered!') => {
        console.log(message);
        sendButton.removeAttribute('disabled');
    });

    addMessage(
        { username: username, text: chatInput.value, createdAt: new Date().getTime() },
        true
    );
    chatInput.value = '';
    chatInput.focus();
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
                sendButton.removeAttribute('disabled');
            }
        );
        addMessage(
            {
                url: `https://www.google.com/maps/@${position.coords.latitude},${position.coords.longitude},13z`,
                text: 'This is my current location',
                geolocation: true,
                createdAt: moment(new Date().getTime()).format('h:mm a'),
            },
            true
        );
    });
});

const addMessage = (data, isSelf = false) => {
    let html = '';
    if (isSelf) {
        if (data.geolocation) {
            html = Mustache.render(locationTemplate, {
                url: data.url,
                text: data.text,
                time: data.createdAt,
            });
            return messageList.insertAdjacentHTML('beforeend', html);
        }
        html = Mustache.render(msgTemplateClient, {
            username: data.username,
            message: data.text,
            time: data.createdAt && moment(data.createdAt).format('h:mm a'),
        });
    } else {
        if (data.geolocation) {
            html = Mustache.render(locationTemplateServer, {
                url: data.url,
                text: data.text,
                time: data.createdAt,
            });
            return messageList.insertAdjacentHTML('beforeend', html);
        }
        html = Mustache.render(msgTemplateServer, {
            username: data.username,
            message: data.text,
            time: data.createdAt && moment(data.createdAt).format('h:mm a'),
        });
    }
    messageList.insertAdjacentHTML('beforeend', html);
};

socket.emit('join', { username, room }, (error) => {
    if (error) {
        const html = `
        <div class="error">
            <h3>
                ${error}
            </h3>
        </div>
        `;
        // return loginInput.insertAdjacentHTML('beforeend', html);
        alert(error);
        location.href = '/';
    }
});
