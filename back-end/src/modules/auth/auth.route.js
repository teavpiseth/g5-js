const express = require("express");
const router = express.Router();
const { login, refreshToken } = require("./auth.ctrl");

router.post("/login", login);
router.post("/refresh-token", refreshToken);

module.exports = router;
