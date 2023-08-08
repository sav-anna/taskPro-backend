const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      default: "New Board",
    },
    icon: {
      type: String,
      enum: [
        "icon-project",
        "icon-star",
        "icon-loading",
        "icon-puzzle-piece",
        "icon-container",
        "icon-lightning",
        "icon-colors",
        "icon-hexagon",
      ],
      default: "icon-project",
    },
    background: { type: String, default: "" },
    columnOrder: { type: Array, default: [] },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

boardSchema.post("save", handleMongooseError);

const Board = model("board", boardSchema);

module.exports = { Board };
