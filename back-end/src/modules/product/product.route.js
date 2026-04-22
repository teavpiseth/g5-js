const express = require("express");
const router = express.Router();
const { create, getList } = require("./product.ctrl");

router.get("/", getList);
router.post("/", create);

module.exports = router;
