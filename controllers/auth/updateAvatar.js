const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  try {
    const image = await Jimp.read(tempUpload);
    await image
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);
  } catch (error) {
    console.error(error);
  }

  const { _id } = req.user;
  const avatarName = `${_id}_${originalname}`;
  try {
    if (tempUpload === "") {
      return;
    }
    const resultUpload = path.join(avatarsDir, avatarName);
    const prevAvatarURL = await User.findById(_id).select("avatarURL");
    const prevAvatarPath = path.join(
      __dirname,
      "../../",
      prevAvatarURL.avatarURL
    );

    // удаление старой аватарки из папки public при обновлении
    try {
      const stats = await fs.stat(prevAvatarPath);
      if (stats.isFile()) {
        await fs.unlink(prevAvatarPath);
      }
    } catch (err) {
      if (err.code !== "ENOENT") {
        console.log("error deleting old avatar: ", err);
      }
    }

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = updateAvatar;
