const { ctrlWrapper } = require("../../helpers");

const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const refreshTokens = require("./refreshTokens");
const updateAvatar = require("./updateAvatar");
const updateTheme = require("./updateTheme");
const updateUser = require("./updateUser");



module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  refreshTokens: ctrlWrapper(refreshTokens),
  updateAvatar: ctrlWrapper(updateAvatar),
  updateTheme: ctrlWrapper(updateTheme),
  updateUser: ctrlWrapper(updateUser),
};
