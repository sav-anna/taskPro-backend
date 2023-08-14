// const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, authHelper } = require("../../helpers");

const { FRONTEND_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id, name, email, theme, avatarURL } = req.user;

  const { accessToken, refreshToken } = await authHelper.updateTokens(id);

  await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  res.json({
    id,
    token: accessToken,
    refreshToken,
    theme,
    avatarURL,
    name,
    email,
  });

  res.redirect(`${FRONTEND_URL}/auth/login`);

  // res.redirect(
  //   `${FRONTEND_URL}/auth/login?accessToken=${accessToken}&refreshToken=${refreshToken}`
  // );
  // res.redirect(`${FRONTEND_URL}/home`);
  //   res.redirect(`${FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`)
};

module.exports = googleAuth;
