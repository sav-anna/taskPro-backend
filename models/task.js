const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Task",
      required: [true, "Set title for Task"],
    },
    description: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["without", "low", "medium", "high"],
      default: "without",
    },
    deadline: {
      type: String,
      match: /^\d{2}-\d{2}-\d{4}$/,
      default: null,
    },
    parentColumn: {
      type: Schema.Types.ObjectId,
      ref: "column",
      required: [true, "Parent Column id is required"],
    },
    // orderForCurrentColumn: { type: Array, default: [] },
    // orderForNewColumn: { type: Array, default: [] },
  },
  { versionKey: false }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Missing field title",
  }),
  description: Joi.string(),
  priority: Joi.string().valid("without", "low", "medium", "high").messages({
    "any.only": 'Can only be "without", "low", "medium", "high"',
  }),
  deadline: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/),
  parentColumn: Joi.string().required().messages({
    "any.required": "Missing field parentColumn",
  }),
});

const editTaskSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Missing field title",
  }),
  description: Joi.string(),
  priority: Joi.string().valid("without", "low", "medium", "high").messages({
    "any.only": 'Can only be "without", "low", "medium", "high"',
  }),
  deadline: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/),
});

const updateParentColumnSchema = Joi.object({
  parentColumn: Joi.string().required().messages({
    "any.required": "Missing field parentColumn",
  }),
  orderForCurrentColumn: Joi.array(),
  orderForNewColumn: Joi.array(),
});

const schemas = {
  addTaskSchema,
  editTaskSchema,
  updateParentColumnSchema,
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };
