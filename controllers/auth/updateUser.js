const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
  const { _id } = req.user;
  const { name = "", password = "", email = "" } = req.body;
  const user = await User.findById(_id);
  const hashPassword = await bcrypt.hash(password, 10);
  let avatarURL = user.avatarURL;
  if (!user) {
    throw HttpError(404, "Not found");
  }

  if (name !== "") {
    user.name = name;
  }
  if (password !== "") {
    user.password = password;
  }
  if (email !== "") {
    user.email = email;
  }
  if (req.file) {
    if (avatarURL !== "") {
      const urlSliced = avatarURL.slice(62, avatarURL.length - 4);
      await cloudinary.uploader.destroy(urlSliced, {
        invalidate: true,
        resource_type: "image",
      });
    }
    avatarURL = req.file.path;
  }

  await User.findByIdAndUpdate(
    _id,
    {
      name: user.name,
      email: user.email,
      avatarURL,
      password: hashPassword,
    },
    { new: true }
  );

  res.json({
    status: "Successfully updated",
    code: 200,
    _id: user._id,
    name: user.name,
    email: user.email,
    theme: user.theme,
    avatarURL,
  });
};

module.exports = updateUser;
