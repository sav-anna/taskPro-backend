const { Task } = require("../../models/task");

const { HttpError } = require("../../helpers");

const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Task not found");
  }

  res.status(201).json(result);
};

module.exports = updateTask;
