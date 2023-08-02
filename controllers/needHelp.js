const { needHelpMail } = require("../models/needHelp");
const { ctrlWrapper, sendNeedHelpMail } = require("../helpers/needHelp");

const createNeedHelpMail = async (req, res) => {
  const { email, message } = req.body;

  const supportMail = {
    to: "taskpro.project@gmail.com",
    subject: "Support mail",
    html: `<p>${message}</a>`,
    from: email,
  };

  await needHelpMail.create({ ...req.body });

  await sendNeedHelpMail(supportMail);
  res.status(201).json({
    message: "Message successfully sent",
  });
};

module.exports = {
  createNeedHelpMail: ctrlWrapper(createNeedHelpMail),
};
