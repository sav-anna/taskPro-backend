const express = require("express");
const { authenticate, upload } = require("../../middlewares");
const ctrl = require("../../controllers/board");

const router = express.Router();

router.get("/", authenticate, ctrl.getBoards);

router.get("/:boardId", authenticate, ctrl.getBoardById);

router.post("/", authenticate, ctrl.addBoard);

router.put("/:boardId", authenticate, ctrl.updateBoard);

router.delete("/:boardId", authenticate, ctrl.removeBoard);

module.exports = router;
