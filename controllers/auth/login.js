const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const { HttpError, authHelper } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { accessToken, refreshToken } = await authHelper.updateTokens(user._id);

  res.json({
    id: user._id,
    accessToken,
    refreshToken,
    theme: user.theme,
    avatarURL: user.avatarURL,
    name: user.name,
    email: user.email,
  });
};

module.exports = login;
