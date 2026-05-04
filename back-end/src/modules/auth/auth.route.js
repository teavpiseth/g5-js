const express = require("express");
const router = express.Router();
const { login } = require("./auth.ctrl");

router.post("/login", login);

module.exports = router;
