
const nodemailer = require("nodemailer");
const { meter } = require("../metrics/meter");
const { logger } = require("../logging/logger");

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
        logger.warn(`Couldn't send invoice email to ${to}`);
        meter.trackInvoiceFailure();
    } else {
        logger.info(`Successfully sent invoice email to ${to}`);
        meter.trackInvoiceSuccess();
    }
}

exports.send = send;