const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const refreshTokens = require("./refreshTokens");
const updateTheme = require("./updateTheme");
const updateUser = require("./updateUser");
const createHelpMail = require("./needHelp");
const googleAuth = require("./googleAuth");

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateTheme: ctrlWrapper(updateTheme),
  updateUser: ctrlWrapper(updateUser),
  refreshTokens: ctrlWrapper(refreshTokens),
  createHelpMail: ctrlWrapper(createHelpMail),
  googleAuth: ctrlWrapper(googleAuth),
};
