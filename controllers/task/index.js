const { ctrlWrapper } = require("../../helpers");

const getTaskById = require("./getTaskById");
const addTask = require("./addTask");
const updateTask = require("./updateTask");
const updateTaskOwner = require("./updateTaskOwner");
const removeTask = require("./removeTask");

module.exports = {
  getTaskById: ctrlWrapper(getTaskById),
  addTask: ctrlWrapper(addTask),
  updateTask: ctrlWrapper(updateTask),
  updateTaskOwner: ctrlWrapper(updateTaskOwner),
  removeTask: ctrlWrapper(removeTask),
};
