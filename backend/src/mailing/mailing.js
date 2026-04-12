const nodemailer = require('nodemailer');
const { meter } = require('../metrics/meter');
const { logger } = require('../logging/logger');

async function send(from, to, subject, html, attachments) {
  const mailer = createMailer();

  const info = await mailer.sendMail({
    from,
    to,
    subject,
    html,
    attachments,
  });

  if (info.rejected.length > 0) {
    logger.warn(`Couldn't send invoice email to ${to}`);
    meter.trackInvoiceFailure();
  } else {
    logger.info(`Successfully sent invoice email to ${to}`);
    meter.trackInvoiceSuccess();
  }
}

const createMailer = () => {
  const shouldSecure = process.env.SMTP_SECURE === 'true';
  const config = {
    connectionTimeout: 5000,
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: shouldSecure,
    auth: shouldSecure
      ? {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        }
      : null,
  };

  return nodemailer.createTransport(config);
};

exports.send = send;
