const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      // default: "New Board",
    },
    icon: {
      type: String,
      enum: [
        "project",
        "star",
        "loading",
        "puzzle-piece",
        "container",
        "lightning",
        "colors",
        "hexagon",
      ],
      default: "project",
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

const addBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string()
    .valueOf(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .required(),
  background: Joi.string().allow("").optional(),
  columnOrder: Joi.array(),
});

const editBoardSchema = Joi.object({
  title: Joi.string().required(),
  icon: Joi.string()
    .valueOf(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .required(),
  background: Joi.string().allow("").optional(),
  columnOrder: Joi.array(),
});

const schemas = {
  addBoardSchema,
  editBoardSchema,
};

const Board = model("board", boardSchema);

module.exports = { Board, schemas };
