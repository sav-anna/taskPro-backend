const express = require("express");

const ctrl = require("../../controllers/task");

const { authenticate, validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/task");

const router = express.Router();

router.get("/:taskId", authenticate, ctrl.getTaskById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addTaskSchema),
  ctrl.addTask
);

router.put(
  "/:taskId",
  authenticate,
  validateBody(schemas.editTaskSchema),
  ctrl.updateTask
);

router.delete("/:taskId", authenticate, ctrl.removeTask);

router.patch(
  "/:taskId/owner/:columnId",
  authenticate,
  validateBody(schemas.updateParentColumnSchema),
  ctrl.updateTaskOwner
);

module.exports = router;
