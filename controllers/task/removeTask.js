const { Task } = require("../../models/task");
const { Column } = require("../../models/column");

const { HttpError } = require("../../helpers");

// const removeTask = async (req, res) => {
//   const { taskId } = req.params;
//   const result = await Task.findByIdAndRemove(taskId);
//   if (!result) throw HttpError(404);

//   res.status(204).json({ message: `Task ${taskId} successfully deleted` });
// };

const removeTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    throw HttpError(404, "Task not found");
  }
  await Column.findByIdAndUpdate(task.parentColumn, {
    $pull: { taskOrder: task._id },
  });
  const result = await Task.findByIdAndDelete(taskId);
  if (!result) {
    throw HttpError(404, "Task not found");
  }

  res.json(result);
};

module.exports = removeTask;
