const fs = require('fs');

const mongoose = require('mongoose');

const { SendInvoice } = require('@/emailTemplate/SendEmailTemplate');
const Model = mongoose.model('Client');

const mailing = require('../../../mailing/mailing');

const mail = async (req, res) => {
  const { id, clientId } = req.body;

  const user = await Model.findOne({ _id: clientId }).exec();
  const recepient = user.email;

  const html = SendInvoice({ title: 'Invoice', time: new Date() });
  await mailing.send(process.env.MAIL_FROM, recepient, 'Invoice', html);

  return res
    .status(200)
    .json({ success: true, result: null, message: 'Invoice sent successfully' });
};

module.exports = mail;
