const { Board } = require("../../models/board");
const { Column } = require("../../models/column");
const { HttpError } = require("../../helpers");

const getBoardById = async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById({ boardId });

  if (!board) throw HttpError(404);

  const columns = await Column.find({ parentBoard: board._id });

  if (columns.length > 0) {
    const columnsWithCards = await Column.aggregate([
      {
        $match: {
          parentBoard: boardId,
        },
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

    res.json({
      dashboard,
      columns: columnsWithCards,
    });
  }

  res.json({
    dashboard,
    columns: [],
  });
};

module.exports = getBoardById;
