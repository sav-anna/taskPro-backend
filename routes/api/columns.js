const express = require("express");

const { authenticate, validateBody, isValidId } = require("../../middlewares");

const ctrl = require("../../controllers/column");

const router = express.Router();

router.get("/:columnId", authenticate, ctrl.getColumnById);

router.post("/", authenticate, ctrl.addColumn);

router.put("/:columnId", authenticate, ctrl.updateColumn);

router.delete("/:columnId", authenticate, ctrl.removeColumn);

module.exports = router;
