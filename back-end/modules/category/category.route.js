const express = require("express");
const router = express.Router();
const { getList } = require("./category.ctrl");

router.get("/", getList);

module.exports = router;
