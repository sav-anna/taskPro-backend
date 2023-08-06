const { Board } = require("../../models/board");
const { HttpError } = require("../../helpers");

const updateBoard = async (req, res) => {
  const { boardId } = req.params;
  const result = await Board.findByIdAndUpdate(boardId, req.body, {
    new: true,
  });
  if (!result) throw HttpError(404);
  res.json(result);
};

module.exports = updateBoard;
