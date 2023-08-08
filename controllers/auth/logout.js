const Token  = require("../../models/token");
const logout = async (req, res) => {
  const { user } = req;

  await Token.findOneAndRemove({ userId: user._id });
  res.status(204);
};
module.exports = logout;
