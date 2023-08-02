const { User } = require("../../models/user");

const { HttpError } = require("../../helpers");

const updateTheme = async (req, res) => {       
    const {_id} = req.user;
    const result =await User.findByIdAndUpdate(_id, req.body, {new: true});
    if(!result){
      throw HttpError(404, "Not found");
    }
    res.status(200).json({"theme": result.theme});
  } 

module.exports = updateTheme;