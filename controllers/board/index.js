const { ctrlWrapper } = require("../../helpers");

const addBoard = require("./addBoard");
const removeBoard = require("./removeBoard");
const getBoards = require("./getBoards");
const updateBoard = require("./updateBoard");

module.exports = {
  addBoard: ctrlWrapper(addBoard),
  removeBoard: ctrlWrapper(removeBoard),
  getBoards: ctrlWrapper(getBoards),
  updateBoard: ctrlWrapper(updateBoard),
};
