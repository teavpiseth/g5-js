const express = require("express");
const router = express.Router();
const { create } = require("./product.ctrl");

router.post("/", create);

module.exports = router;
