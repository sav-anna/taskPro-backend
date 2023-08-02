const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");
require("dotenv").config();

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click to verify email</a>`,
  // };
  // await sendEmail(verifyEmail);

  res.status(201).json({
    email: newUser.email,
    name: newUser.name,
  });
};

module.exports = register;
