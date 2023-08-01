const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");
console.log(avatarsDir);

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const fileName = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, fileName);

  await Jimp.read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).quality(60).greyscale().write(resultUpload);
    })
    .catch((err) => {
      throw new Error(`Failed to resize avatar: ${err}`);
    });
  await fs.unlink(tempUpload);
  //   await fs.rename(tempUpload, resultUpload); якщо без Jimpt
  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({ avatarURL });
};

module.exports = updateAvatar;
