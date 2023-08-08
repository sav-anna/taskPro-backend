const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for Board"],
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
  title: Joi.string().required().messages({
    "any.required": "Missing field title",
  }),
  icon: Joi.string()
    .valid(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .required()
    .messages({
      "any.only":
        'Can only be "project", "star", "loading", "puzzle-piece", "container", "lightning", "colors", "hexagon"',
    }),
  background: Joi.string().allow(""),
  columnOrder: Joi.array(),
});

const editBoardSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": "Missing field title",
  }),
  icon: Joi.string()
    .valid(
      "project",
      "star",
      "loading",
      "puzzle-piece",
      "container",
      "lightning",
      "colors",
      "hexagon"
    )
    .required()
    .messages({
      "any.only":
        'Can only be "project", "star", "loading", "puzzle-piece", "container", "lightning", "colors", "hexagon"',
    }),
  background: Joi.string().allow(""),
  columnOrder: Joi.array(),
});

const schemas = {
  addBoardSchema,
  editBoardSchema,
};

const Board = model("board", boardSchema);

module.exports = { Board, schemas };
