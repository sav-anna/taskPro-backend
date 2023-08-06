const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const Token = require("../../models/token");
const { HttpError, authHelper } = require("../../helpers");


const { SECRET_KEY } = process.env;

const refreshTokens = async (req,res) => {
    const {refreshToken} = req.body;

    let payload;
    try {
        payload = jwt.verify(refreshToken, SECRET_KEY);
        if (payload.type !== 'refresh') {
            throw HttpError(400, "Invalid token");
        };

        const token = await Token.findOne({tokenId: payload.id});
        if(token===null){
             throw HttpError(400, "Invalid token");
        };
        const newTokens = await authHelper.updateTokens(token.userId);
        res.status(200).json(newTokens);

    } catch (error) {
        if(error instanceof jwt.TokenExpiredError){
            throw HttpError(400, "Expired token");
        }else if (error instanceof jwt.JsonWebTokenError){
            throw HttpError(400, "Invalid token");
        };
    }

};
module.exports = refreshTokens;