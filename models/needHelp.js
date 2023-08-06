const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const needHelpSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const addSchema = Joi.object({
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

const schemas = {
  addSchema,
};

needHelpSchema.post("save", handleMongooseError);

const needHelpMail = model("needHelp", needHelpSchema);

module.exports = {
  needHelpMail,
  schemas,
};
