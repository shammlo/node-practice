export {};
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

const key = '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';
sgMail.setApiKey(key);

const msg = {
    to: 'shamlo.redzx@gmail.com',
    from: 'shamlo.redzx@gmail.com',
    subject: 'Sending with Twilio SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
};
sgMail
    .send(msg)
    .then(() => {
        console.log('Email sent');
    })
    .catch((error: any) => {
        console.error(error);
    });
