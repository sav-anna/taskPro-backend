const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const tokenSchema = new Schema(
  {
    tokenId: {
      type: String,
    //   required: true,
    },
    userId: {
      type: String,
    //   required: true,
    },
    
  },
  { versionKey: false, timestamps: true }
);

// tokenSchema.post("save", handleMongooseError);
const Token = model("token", tokenSchema);

module.exports = Token;

// const { Schema, model } = require('mongoose')

// const schema = new Schema(
//   {
//     tokenId: String,
//     userId: String,
//   },
//   {
//     timestamps: false,
//     versionKey: false,
//   }
// )

// const Token = model('token', schema)

// module.exports = Token