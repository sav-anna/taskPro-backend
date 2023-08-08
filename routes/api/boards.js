const express = require("express");
const { authenticate, validateBody } = require("../../middlewares");
const ctrl = require("../../controllers/board");
const { schemas } = require("../../models/board");

const router = express.Router();

router.get("/", authenticate, ctrl.getBoards);

router.get("/:boardId", authenticate, ctrl.getBoardById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addBoardSchema),
  ctrl.addBoard
);

router.put(
  "/:boardId",
  authenticate,
  validateBody(schemas.editBoardSchema),
  ctrl.updateBoard
);

router.delete("/:boardId", authenticate, ctrl.removeBoard);

module.exports = router;
