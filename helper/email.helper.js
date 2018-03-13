const nodemailer = require('nodemailer');
const Promise = require('promise')

let helper = {};

helper.sendEmail = sendEmail;

module.exports = helper;

let transporter = nodemailer.createTransport({
    host: 'smtp.umbler.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "comercial@avallie.com", // generated ethereal user
        pass: "4v4lli3comercial"  // generated ethereal password
    }
});

// send mail with defined transport object
function sendEmail(mailOptions){
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve("Mensagem enviada" + info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            }
        });
    });
}
