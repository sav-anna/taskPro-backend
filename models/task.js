const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

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
      type: Date,
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

const Task = model("task", taskSchema);

module.exports = { Task };
