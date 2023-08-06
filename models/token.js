// const { Schema, model } = require("mongoose");
// const { handleMongooseError } = require("../helpers");
// // const Joi = require("joi");

// // const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
// // const nameRegexp =/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
// // const passwordRegexp = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;


// const tokenSchema = new Schema(
//   {
//     tokenId: {
//       type: String,
//     //   required: true,
//     },
//     userId: {
//       type: String,
//     //   required: true,
//     },
    
//   },
//   { versionKey: false, timestamps: true }
// );

// tokenSchema.post("save", handleMongooseError);


// // const loginSchema = Joi.object({
// //   email: Joi.string().pattern(emailRegexp).required(),
// //   password: Joi.string().pattern(passwordRegexp).min(8).max(64).required(),
// // });



// const Token = model("token", tokenSchema);

// module.exports = Token;
const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    tokenId: String,
    userId: String,
  },
  {
    timestamps: false,
    versionKey: false,
  }
)

const Token = model('token', schema)

module.exports = Token