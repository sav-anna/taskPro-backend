const { Column } = require("../../models/column");
const { Board } = require("../../models/board");

const { HttpError } = require("../../helpers");

const addColumn = async (req, res) => {
  const { parentBoard } = req.body;
  const result = await Column.create({ ...req.body });
  await Board.findByIdAndUpdate(parentBoard, { $push: { columnOrder: result._id } }, { safe: true, upsert: true, new: true });

  res.status(201).json(result);
};

module.exports = addColumn;
