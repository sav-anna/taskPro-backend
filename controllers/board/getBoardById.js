const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);

  if (!board) throw HttpError(404);

  const columns = await Column.find({ parentBoard: board._id });
  let columnsWithCards = [];

  if (columns.length > 0) {
    columnsWithCards = await Column.aggregate([
      {
        $match: { $or: columns },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "parentColumn",
          as: "tasks",
        },
      },
    ]);
  }

  res.json({
    board,
    columns: columnsWithCards,
  });
};

module.exports = getBoardById;
