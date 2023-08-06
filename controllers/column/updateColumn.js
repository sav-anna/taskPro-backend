const { Column } = require("../../models/column");

const { HttpError } = require("../../helpers");

const updateColumn = async (req, res) => {
  const { columnId } = req.params;
  const { title } = req.body;
  const result = await Column.findByIdAndUpdate(columnId, { title }, { new: true });
  if (!result) {
    throw HttpError(404, "Column not found");
  }

  res.status(201).json(result);
};

module.exports = updateColumn;
