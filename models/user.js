const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const emailRegexp = /^[a-zA-Z0-9.!#$%&’*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;
const nameRegexp =/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
const passwordRegexp = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;


const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxLength: 32,
      match: nameRegexp,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      match: passwordRegexp,
      minlength: 8,
      maxLength: 64,
      required: [true, "Set password for user"],
    },
    // token: {
    //   type: String,
    //   default: "",
    // },
    avatarURL: {
      type: String,
      default: "",
    },
    theme: {
      type: String,
      enum: ["Dark", "Light", "Violet"],
      default: "Dark",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(2).max(32).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(8).max(64).required(),
});
const updateUserSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp).min(2).max(32),
  email: Joi.string().pattern(emailRegexp),
  password: Joi.string().pattern(passwordRegexp).min(8).max(64),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().pattern(passwordRegexp).min(8).max(64).required(),
});

const updateTheme = Joi.object({
  theme: Joi.string().valueOf("Dark", "Light", "Violet").required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateTheme,
  updateUserSchema
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
