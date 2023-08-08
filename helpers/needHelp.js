const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendNeedHelpMail = async (data) => {
  await sgMail.send(data);
  return true;
};

module.exports = sendNeedHelpMail;
