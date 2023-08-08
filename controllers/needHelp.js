const { needHelpMail } = require("../models/needHelp");
const { ctrlWrapper } = require("../helpers");
const sendEmail = require("../helpers/needHelp");

const createHelpMail = async (req, res) => {
  const { email, message } = req.body;

  const supportMail = {
    to: "taskpro.project@gmail.com",
    // to: "folix25060@royalka.com",
    subject: `Support request from ${email}`,
    html: `<p>${message}</p>`,
  };

  await needHelpMail.create({ ...req.body });

  await sendEmail(supportMail);

  res.status(201).json({
    message: "Your mail successfully sent",
  });
};

module.exports = {
  createHelpMail: ctrlWrapper(createHelpMail),
};
