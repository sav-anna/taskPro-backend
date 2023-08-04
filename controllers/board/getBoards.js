const { Board } = require("../../models/board");

const getBoards = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.find({ owner }, "-createdAt -updatedAt");
  res.json(result);
};

module.exports = getBoards;
