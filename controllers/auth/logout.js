const { Token }  = require("../../models/token");
const logout = async (req, res) => {
  const { user } = req;

  await Token.findOneAndRemove({ userId: user._id });
  res.status(200).json({
    message: "Logout successful"
  });
};
module.exports = logout;
