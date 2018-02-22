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
        user: "vinicius@savisoft.com.br", // generated ethereal user
        pass: "57585955v"  // generated ethereal password
    }
});

//SEND THIS MAIL OPTIONS AS SENDMAIL FUNCTION ARGUMENT

// setup email data with unicode symbols
 let mailOptions = {
    from: "vinicius@savisoft.com.br",
    to: "kiddlima@outlook.com", // list of receivers
    subject: 'Hello', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
}; 

// send mail with defined transport object
function sendEmail(){
    console.log("aaaa")
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
