const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // default: "New Column",
    },
    parentBoard: {
      type: Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    taskOrder: { type: Array, default: [] },
  },
  { versionKey: false }
);

columnSchema.post("save", handleMongooseError);

const addColumnSchema = Joi.object({
  title: Joi.string().required(),
  parentBoard: Joi.string().required(),
  taskOrder: Joi.array(),
});

const editColumnSchema = Joi.object({
  title: Joi.string().required(),
  taskOrder: Joi.array(),
});

const schemas = {
  addColumnSchema,
  editColumnSchema,
};

const Column = model("column", columnSchema);

module.exports = { Column, schemas };
