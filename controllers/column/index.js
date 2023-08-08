const { ctrlWrapper } = require("../../helpers");

const addColumn = require("./addColumn");
const removeColumn = require("./removeColumn");
const getColumnById = require("./getColumnById");
const updateColumn = require("./updateColumn");

module.exports = {
  addColumn: ctrlWrapper(addColumn),
  removeColumn: ctrlWrapper(removeColumn),
  getColumnById: ctrlWrapper(getColumnById),
  updateColumn: ctrlWrapper(updateColumn),
};
