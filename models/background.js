const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");

const backgroundSchema = new Schema(
  {
    bgrId: {
      type: String,
      required: [true, "bgrId is required"],
    },
    desktop: {
      type: String,
      required: [true, "desktop URL is required"],
    },
    retina: {
      type: String,
      required: [true, "retina URL is required"],
    },
    tablet: {
      type: String,
      required: [true, "tablet URL is required"],
    },
    mobile: {
      type: String,
      required: [true, "mobile URL is required"],
    },
  },
  { versionKey: false }
);

backgroundSchema.post("save", handleMongooseError);

const Background = model("background", backgroundSchema);

module.exports = { Background };
