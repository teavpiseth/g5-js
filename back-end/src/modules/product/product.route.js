const express = require("express");
const router = express.Router();
const { create, getList, update, deleteProduct } = require("./product.ctrl");

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteProduct);

module.exports = router;
