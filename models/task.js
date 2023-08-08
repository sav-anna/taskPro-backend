const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Task",
      required: true,
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
      required: true,
    },
  },
  { versionKey: false }
);

taskSchema.post("save", handleMongooseError);

const addTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  priority: Joi.string().valueOf("without", "low", "medium", "high"),
  deadline: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/),
  parentColumn: Joi.string().required(),
});

const editTaskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  priority: Joi.string().valueOf("without", "low", "medium", "high"),
  deadline: Joi.string().pattern(/^\d{2}-\d{2}-\d{4}$/),
});

const updateParentColumnSchema = Joi.object({
  parentColumn: Joi.string().required(),
});

const schemas = {
  addTaskSchema,
  editTaskSchema,
  updateParentColumnSchema,
};

const Task = model("task", taskSchema);

module.exports = { Task, schemas };
