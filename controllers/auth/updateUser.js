const bcrypt = require("bcrypt");
const path = require("path");
const cloudinary = require("cloudinary").v2;

const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name="", password="", email="" } = req.body;
    const user = await User.findById(id);
    if (!user) {
        throw HttpError(404, "Not found");
    }
 
    if (name!=="") {
      user.name = name;
    }
    if (password!=="") {
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
    }
    if (email!=="") {
        user.email = email;
    }

      // Upload local avatar file to Cloudinary
   
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      });

  if (user.avatarURL && !user.avatarURL.startsWith("http")) {
    const localAvatarPath = path.join(__dirname, "../../", user.avatarURL);
    const avatarName = path.basename(localAvatarPath);
    const uniquePublicId = `${avatarName}_${Date.now()}`;
    const uploadResponse = await cloudinary.uploader.upload(localAvatarPath, {
      folder: "avatars",
      public_id: uniquePublicId, 
    });

    user.avatarURL = uploadResponse.secure_url;
  }
    await user.save();
   

    res.status(200).json({"name":user.name, "email":user.email, "avatarURL":user.avatarURL});
  
};

module.exports = updateUser;
