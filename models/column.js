const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const columnSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Column",
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

const Column = model("column", columnSchema);

module.exports = { Column };
