const { Column } = require("../../models/column");
const { Task } = require("../../models/task");

const { HttpError } = require("../../helpers");

const getColumnById = async (req, res) => {
  const { columnId } = req.params;
  const column = await Column.findById(columnId);
  if (!column) throw HttpError(404);
  const tasks = await Task.find({ owner: column._id });
  if (!tasks) throw HttpError(404);
  res.json({
    column,
  });
};

module.exports = getColumnById;
