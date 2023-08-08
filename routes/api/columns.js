const express = require("express");

const { authenticate, validateBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/column");

const { schemas } = require("../../models/column");

const router = express.Router();

router.get("/:columnId", authenticate, ctrl.getColumnById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addColumnSchema),
  ctrl.addColumn
);

router.put(
  "/:columnId",
  authenticate,
  validateBody(schemas.editColumnSchema),
  ctrl.updateColumn
);

router.delete("/:columnId", authenticate, ctrl.removeColumn);

module.exports = router;
