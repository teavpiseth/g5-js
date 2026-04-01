const express = require("express");
const router = express.Router();
const { getList, update, deleteCategory } = require("./category.ctrl");

router.get("/", getList);
router.put("/:id", update);
router.delete("/:id", deleteCategory);

module.exports = router;
