const nodemailer = require("nodemailer");
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const parameters = require('../../app/config/parameters.json');

const template = fs.readFileSync(path.resolve('./app/resources/mail.html')).toString();

const smtpTransport = nodemailer.createTransport({
  host: "smtp.yandex.ru",
  port: 587,
  secure: false,
  auth: {
    user: parameters.mailUser,
    pass: parameters.mailPassword
  }
});


const defaultMailOptions = {
  from: "inbox@daze.tech",
  to: "mail@daze.com",
  subject: "inbox from website ✔",
  text: "something went wrong",
  html: "<b>something went wrong</b>"
};

const mailer = {
  sendMail(options) {
    const {email, message, name} = options;
    const html = _.template(template)({data: {email, message, name}});
    const text = `message: ${message}, email: ${email}, name: ${name}`;
    const mailOptions = _.extend({}, defaultMailOptions, {html, text});
    return new Promise((res, rej) => {
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.error('message not dilivered', text, {errorMessage: error.message});
          rej(error);
        } else {
          res("Message sent: " + response.message);
        }
      });
    })
  }
};

module.exports.mailer = mailer;
