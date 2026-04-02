const express = require("express");
const router = express.Router();
const { getList, create, update, deleteCategory } = require("./category.ctrl");

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteCategory);

module.exports = router;
