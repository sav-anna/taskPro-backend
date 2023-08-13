const { Column } = require("../../models/column");
const { Board } = require("../../models/board");
const { Task } = require("../../models/task");

const { HttpError } = require("../../helpers");

// const removeColumn = async (req, res) => {
//   const { columnId } = req.params;
//   const result = await Column.findByIdAndRemove(columnId);
//   if (!result) throw HttpError(404);
//   res.json(result);
// };

const removeColumn = async (req, res) => {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) {
    throw HttpError(404, "Column not found");
  }
  await Board.findByIdAndUpdate(column.parentBoard, {
    $pull: { columnOrder: columnId },
  });
  const result = await Column.findByIdAndRemove(columnId);
  if (!result) {
    throw HttpError(404, "Column not found");
  }
  const parentColumn = columnId;
  const chlidren = await Task.find({ parentColumn });
  if (chlidren.length > 0) {
    await Task.deleteMany({ parentColumn });
  }

  res.json(result);
};

module.exports = removeColumn;
