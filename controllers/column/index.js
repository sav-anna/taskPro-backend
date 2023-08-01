const { ctrlWrapper } = require("../../helpers");

const addColumn = require("./addColumn");
const removeColumn = require("./removeColumn");
const getColumns = require("./getColumns");
const updateColumn = require("./updateColumn");

module.exports = {
  addColumn: ctrlWrapper(addColumn),
  removeColumn: ctrlWrapper(removeColumn),
  getColumns: ctrlWrapper(getColumns),
  updateColumn: ctrlWrapper(updateColumn),
};
