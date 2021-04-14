const nodemailer = require('nodemailer');
const config = require('../configs/email');

class Transporter {
    constructor() {
        nodemailer.createTestAccount().then(testAccount => {
            this.transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: testAccount.user, // generated ethereal user
                    pass: testAccount.pass, // generated ethereal password
                },
            })
        });
    }

    async sendEmail(to, subject, html) {
        let info = await this.transporter.sendMail({
            from: `Node JS Project <${config.user}>`,
            to: to,
            subject: subject,
            text: "Hello world?",
            html: html,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return info;
    }
}

const emailManager = new Transporter();

module.exports = emailManager;
