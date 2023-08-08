const { Task } = require("../../models/task");

const { HttpError } = require("../../helpers");

// const updateTaskOwner = async (req, res) => {
//   const { taskId, columnId } = req.params;
//   const result = await Task.findByIdAndUpdate(
//     taskId,
//     { owner: columnId },
//     {
//       new: true,
//     }
//   );
//   if (!result) throw HttpError(404);
//   res.json(result);
// };

const updateTaskOwner = async (req, res) => {
  const { taskId } = req.params;
  const result = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Task ${taskId} not found`);
  }

  res.status(201).json(result);
};

module.exports = updateTaskOwner;
