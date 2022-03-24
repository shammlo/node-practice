import Mustache from 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.js';
const socket = io();

const form = document.querySelector('#form');
const input = document.querySelector('#input');
const sendButton = document.querySelector('#send');
const geoButton = document.querySelector('#location');
const locationTemplate = document.querySelector('#location-template').innerHTML;
const messageList = document.querySelector('#messages_list');
const msgTemplateClient = document.querySelector('#message-template-client').innerHTML;
const msgTemplateServer = document.querySelector('#message-template-server').innerHTML;
const profile = document.querySelector('.profile');

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
    // const html = Mustache.render(locationTemplate, {
    //     url,
    //     text,
    //     time: createdAt && moment(createdAt).format('h:mm a'),
    // });
    // messageList.insertAdjacentHTML('beforeend', html);

    addMessage(
        {
            url,
            text,
            geolocation,
            createdAt: moment(createdAt).format('h:mm a'),
        },
        true
    );
});

// ----------------------------------------------------------------
socket.on('render-message', (msj) => {
    // const li = document.createElement('li');
    // if (!msj.text) {
    //     return;
    // }
    // const html = `
    //     <div class="message min-w-[100px]">
    //         <p class="message_text mr-8 tracking-wide">${msj.text}</p>
    //         <p class="message_time">${msj.createdAt && moment(msj.createdAt).format('h:mm a')}</p>
    //     </div>
    // `;
    // li.innerHTML = html;
    // li.classList.add('text-[#fff]', 'bg-[#3E4042]');
    // messageList.appendChild(li);
    addMessage(msj, false);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendButton.setAttribute('disabled', 'disabled');

    if (input.value.trim() === '') {
        sendButton.removeAttribute('disabled');
        return;
    }
    socket.emit('client-message', input.value, (message = 'Message delivered!') => {
        console.log(message);
        sendButton.removeAttribute('disabled');
    });

    addMessage({ user: socket.id, text: input.value, createdAt: new Date().getTime() }, true);
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
                sendButton.removeAttribute('disabled');
            }
        );
    });
});

const addMessage = (data, isSelf = false) => {
    // const div = document.createElement('div');
    //     const html = Mustache.render(locationTemplate, {
    //         url,
    //         text,
    //         time: createdAt && moment(createdAt).format('h:mm a'),
    //     });
    //     messageList.insertAdjacentHTML('beforeend', html);
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
            message: data.text,
            time: data.createdAt && moment(data.createdAt).format('h:mm a'),
        });
        return messageList.insertAdjacentHTML('beforeend', html);
    } else {
        html = Mustache.render(msgTemplateServer, {
            message: data.text,
            time: data.createdAt && moment(data.createdAt).format('h:mm a'),
        });
        messageList.insertAdjacentHTML('beforeend', html);

        if (data.server) {
            // html = `
            //     <div class="text-[#fff] bg-[#3E4042]">
            //         <div class="message min-w-[100px]">
            //             <p class="message_text mr-8 tracking-wide">${data.text}</p>
            //             <p class="message_time">${
            //                 data.createdAt && moment(data.createdAt).format('h:mm a')
            //             }</p>
            //         </div>
            //         server...
            //         </div>
            // `;
        }
    }

    // const chatContainer = document.getElementById('chatContainer');
    // chatContainer.append(messageElement);
    // div.innerHTML = html;
    // adds the new div to the message container div
};
