const { Column } = require("../../models/column");
const { Task } = require("../../models/task");

const { HttpError } = require("../../helpers");

// const addTask = async (req, res) => {
//   const { columnId } = req.params;
//   const result = await Task.create({
//     ...req.body,
//     owner: columnId,
//   });

//   res.status(201).json(result);
// };

const addTask = async (req, res) => {
  const { parentColumn } = req.body;
  const result = await Task.create({ ...req.body });
  await Column.findByIdAndUpdate(parentColumn, { $push: { taskOrder: result._id } }, { safe: true, upsert: true, new: true });

  res.status(201).json(result);
};

module.exports = addTask;
