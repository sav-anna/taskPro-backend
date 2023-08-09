const jwt = require("jsonwebtoken");
const Token = require("../../models/token");
const { HttpError } = require("../../helpers");
const authHelper = require('../../helpers/authHelper');

const { REFRESH_SECRET_KEY } = process.env;

const refreshTokens = async (req,res) => {
    const {refreshToken} = req.body;

    let payload;
    try {
        payload = jwt.verify(refreshToken, REFRESH_SECRET_KEY);
        if (payload.type !== 'refresh') {
            throw HttpError(400, "Invalid token");
        };

        const token = await Token.findOne({tokenId: payload.id});
        if(token===null){
             throw HttpError(400, "Invalid token");
        };
        const newTokens = await authHelper.updateTokens(token.userId);
      return  res.status(200).json(newTokens);

    }  catch (error) {
        if (error.message === 'Expired token') {
          res.status(401).json({ message: 'Refresh token expired' });
        } else {
          res.status(500).json({ message: 'Server error' });
        }
      }

};
module.exports = refreshTokens;