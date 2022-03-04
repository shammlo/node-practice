export {};
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// interface MailServiceType {
//     email: string;
//     name: string;
// }
const welcomeMessage = (email: string, name: string) => {
    sgMail.send({
        to: email,
        from: 'shamlo.redzx@gmail.com',
        subject: 'Welcome to Task Manager',
        text: `Welcome to Task Manager ${name}`,
        html: `<strong>Welcome to Task Manager ${name}</strong>`,
    });
};

const goodbyeMessage = (email: string, name: string) => {
    sgMail.send({
        to: email,
        from: 'shamlo.redzx@gmail.com',
        subject: 'Sign out from from Task Manager',
        text: `Goodbye from Task Manager ${name}`,
        html: `<strong>Goodbye from Task Manager ${name}</strong>`,
    });
};

//----------------------------------------------------------------
module.exports = {
    welcomeMessage,
    goodbyeMessage,
};
