
const nodemailer = require("nodemailer");
const { meter } = require("../metrics/meter");
async function send(from, to, subject, html, attachments) {
    const mailer = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
        }
    });

    const info = await mailer.sendMail({
        from,
        to,
        subject,
        html,
        attachments
    });

    if (info.rejected.length > 0) {
        meter.trackInvoiceFailure();
    } else {
        meter.trackInvoiceSuccess();
    }
}

exports.send = send;