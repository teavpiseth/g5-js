const express = require("express");
const router = express.Router();
const { getList, create, update, deleteUser } = require("./user.ctrl");

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteUser);

module.exports = router;
