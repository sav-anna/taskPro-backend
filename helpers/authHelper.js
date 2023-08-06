const {SECRET_KEY}= process.env;
const {tokens} = require('../config/app').jwt;
const {nanoid} = require("nanoid");
const jwt = require("jsonwebtoken");
const Token = require('../models/token');

const generateAccessToken = (userId) => {
   
  const payload = {
    userId,
    type: tokens.access.type,
    
  }

  const options = {
    expiresIn: tokens.access.expiresIn,
  }

  return jwt.sign(payload, SECRET_KEY, options)
}

const generateRefreshToken = () => {
  const payload = {
    id: nanoid(),
    type: tokens.refresh.type,
  }

  const options = {
    expiresIn: tokens.refresh.expiresIn,
  }

  return {
    id: payload.id,
    token: jwt.sign(payload, SECRET_KEY, options),
  }
}

const replaceDbRefreshToken = async (tokenId, userId) => {
  await Token.findByIdAndDelete(userId)

  const result = await Token.create({ tokenId, userId })

  return result
}

const updateTokens = async (userId) => {
  const accessToken = authHelper.generateAccessToken(userId)
  const refreshToken = authHelper.generateRefreshToken()

  await authHelper.replaceDbRefreshToken(refreshToken.id, userId)

  return { accessToken, refreshToken: refreshToken.token }
}

const authHelper = {
  generateAccessToken,
  generateRefreshToken,
  replaceDbRefreshToken,
  updateTokens,
}

module.exports = authHelper;