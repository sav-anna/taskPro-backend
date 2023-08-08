const { Task } = require("../../models/task");

const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findById(taskId);

  if (!result) throw HttpError(404);

  res.json(result);
};

module.exports = getTaskById;
