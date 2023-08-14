const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, authHelper } = require("../../helpers");

const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const { accessToken, refreshToken } = await authHelper.updateTokens(id);

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  res.redirect(
    `${FRONTEND_URL}/auth/login?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
  // res.redirect(`${FRONTEND_URL}/home`);
  //   res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
};

module.exports = googleAuth;
