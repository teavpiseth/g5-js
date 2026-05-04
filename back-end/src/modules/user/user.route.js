const express = require("express");
const router = express.Router();
const { getList, create, update, deleteUser } = require("./user.ctrl");
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteUser);

module.exports = router;
