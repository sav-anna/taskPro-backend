const express = require("express");

const { authenticate, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/needHelp");

const ctrl = require("../../controllers/needHelp");

const router = express.Router();

router.post("/", authenticate, validateBody(schemas.addSchema), ctrl.createNeedHelpMail);

module.exports = router;
