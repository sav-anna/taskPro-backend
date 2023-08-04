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
        "icon-Project",
        "icon-star-04",
        "icon-loading-03",
        "icon-puzzle-piece-02",
        "icon-container",
        "icon-lightning-02",
        "icon-colors",
        "icon-hexagon-01",
      ],
      default: "icon-Project",
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

module.exports = Board;
