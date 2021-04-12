const nodemailer = require('nodemailer');
const config = require('../configs/email');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.user,
        pass: config.pass
    },
});

const emailManager = async (to, subject, html) => {
    return transporter.sendMail({
        from: `Node JS Project <${config.user}>`,
        to: to,
        subject: subject,
        text: "Hello world?",
        html: html,
    });
}

module.exports = emailManager;
