const { ctrlWrapper } = require("../../helpers");

const addBoard = require("./addBoard");
const removeBoard = require("./removeBoard");
const getBoards = require("./getBoards");
const getBoardById = require("./getBoardById");
const updateBoard = require("./updateBoard");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  removeBoard: ctrlWrapper(removeBoard),
  getBoards: ctrlWrapper(getBoards),
  getBoardById: ctrlWrapper(getBoardById),
  updateBoard: ctrlWrapper(updateBoard),
};
