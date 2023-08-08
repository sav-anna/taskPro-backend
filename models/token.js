const { Schema, model } = require("mongoose");

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

module.exports = Token;
