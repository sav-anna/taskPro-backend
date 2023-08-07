const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const removeBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndRemove(boardId);
  if (!result) {
    throw HttpError(404);
  }
  const columns = await Column.find({ parentBoard: boardId });
  if (columns.length > 0) {
    columns.forEach(
      async (column) => await Task.deleteMany({ parentColumn: column._id })
    );
    await Column.deleteMany({ parentBoard: boardId });
  }

  res.json({
    message: `Board ${boardId} successfully deleted`,
  });
};

module.exports = removeBoard;
