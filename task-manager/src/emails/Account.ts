export {};
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
