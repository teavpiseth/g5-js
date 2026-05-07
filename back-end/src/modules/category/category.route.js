const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/authMiddleware");
const { getList, create, update, deleteCategory } = require("./category.ctrl");

router.get("/web", getList);
// Apply auth middleware to all category routes
router.use(authMiddleware);
router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteCategory);

module.exports = router;
