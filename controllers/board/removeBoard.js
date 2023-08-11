const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { Task } = require("../../models/task");
const { HttpError } = require("../../helpers");

const removeBoard = async (req, res) => {
  const { boardId } = req.params;
  const { _id } = req.user;

  const board = await Board.findOne({ _id: boardId }, "owner");

  if (_id.valueOf() !== board.owner.valueOf()) {
    throw HttpError(403, "You have no permission to delete this Board");
  }

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
    // message: `Board ${boardId} successfully deleted`,
    result,
  });
};

module.exports = removeBoard;
