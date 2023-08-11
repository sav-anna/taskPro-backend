const express = require("express");
const ctrl = require("../../controllers/auth");
const { validateBody, authenticate, uploadCloud } = require("../../middlewares");
const { schemas } = require("../../models/user");
const { needHelpSchemas } = require("../../models/needHelp");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.post("/refreshToken", ctrl.refreshTokens);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, validateBody(schemas.updateTheme), ctrl.updateTheme);
router.put("/", authenticate, uploadCloud.single("avatarURL"), validateBody(schemas.updateUserSchema), ctrl.updateUser);

router.post("/help", authenticate, validateBody(needHelpSchemas.addSchema), ctrl.createHelpMail);

module.exports = router;
