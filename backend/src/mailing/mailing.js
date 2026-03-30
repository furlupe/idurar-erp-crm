
const sendgrid = require("@sendgrid/mail");

async function send(from, to, subject, html, attachments) {
    sendgrid.setApiKey(process.env.MAIL_APIKEY);
    sendgrid.send({
        from,
        to,
        subject,
        html,
        attachments
    });
}

exports.send = send;