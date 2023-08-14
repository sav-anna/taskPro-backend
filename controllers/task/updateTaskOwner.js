const { Task } = require("../../models/task");
const { Column } = require("../../models/column");

const { HttpError } = require("../../helpers");

const updateTaskOwner = async (req, res) => {
  const { taskId } = req.params;
  const { parentColumn, orderForCurrentColumn, orderForNewColumn } = req.body;

  const task = await Task.findOne({ _id: taskId }, "parentColumn");
  const currentOwnerId = task.parentColumn.valueOf();
  const newOwnerId = parentColumn;

  console.log(currentOwnerId);
  console.log(newOwnerId);

  const currentColumn = await Column.findByIdAndUpdate(
    { _id: currentOwnerId },
    { taskOrder: orderForCurrentColumn },
    { new: true }
  );
  if (!currentColumn) throw HttpError(404);

  if (newOwnerId !== currentOwnerId) {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { parentColumn: newOwnerId },
      { new: true }
    );
    const newColumn = await Column.findByIdAndUpdate(
      { _id: newOwnerId },
      { taskOrder: orderForNewColumn },
      { new: true }
    );

    if (!updatedTask || !newColumn) throw HttpError(404);
  }

  // const result = await Task.findByIdAndUpdate(taskId, req.body, { new: true });
  // if (!result) {
  //   throw HttpError(404, `Task ${taskId} not found`);
  // }

  res.status(200).json({ message: "Task Order was successfully updated" });
};

module.exports = updateTaskOwner;
