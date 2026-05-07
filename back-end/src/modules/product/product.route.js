const express = require("express");
const router = express.Router();
const {
  create,
  getList,
  getWebList,
  update,
  deleteProduct,
} = require("./product.ctrl");
const authMiddleware = require("../../middleware/authMiddleware");

router.get("/web", getWebList);

router.use(authMiddleware);

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteProduct);

module.exports = router;
