const { Schema, model } = require("mongoose");
const Joi = require("joi");

const tokenSchema = new Schema(
  {
    tokenId: {
      type: String,
    },
    userId: {
      type: String,
    },
    
  },
  { versionKey: false, timestamps: true }
);

const Token = model("token", tokenSchema);

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
})

module.exports = {
Token,
refreshSchema
};
