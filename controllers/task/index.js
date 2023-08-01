const { ctrlWrapper } = require("../../helpers");

const addTask = require("./addTask");
const removeTask = require("./removeTask");
const getTasks = require("./getTasks");
const updateTask = require("./updateTask");

module.exports = {
  addTask: ctrlWrapper(addTask),
  removeTask: ctrlWrapper(removeTask),
  getTasks: ctrlWrapper(getTasks),
  updateTask: ctrlWrapper(updateTask),
};
