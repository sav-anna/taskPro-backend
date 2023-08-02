const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, password, email } = req.body;
    const user = await User.findById(id);
    if (!user) {
        throw HttpError(404, "Not found");
    }
 
    if (name) {
      user.name = name;
    }
    if (password) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }
    if (email) {
        user.email = email;
    }
    await user.save();

    res.status(200).json({"name":name, "email":email});
  
};

module.exports = updateUser;
