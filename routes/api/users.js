const express = require("express");

const { users: ctrl } = require("../../controllers");
const { auth } = require("../../middlewares");
const { upload } = require("../../utils");

const router = express.Router();

router.post("/register", ctrl.register);
router.post("/login", ctrl.login);
router.post("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.current);
router.patch("/info", auth, upload.single("avatarFile"), ctrl.update);

module.exports = router;
