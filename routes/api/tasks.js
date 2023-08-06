const express = require("express");

const ctrl = require("../../controllers/task");

const { authenticate, validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.use(authenticate);

router.get("/:taskId", authenticate, ctrl.getTaskById);

router.post("/", authenticate, ctrl.addTask);

router.put("/:taskId", authenticate, ctrl.updateTask);

router.delete("/:taskId", authenticate, ctrl.removeTask);

router.put("/:taskId/owner/:columnId", authenticate, ctrl.updateTaskOwner);

module.exports = router;
