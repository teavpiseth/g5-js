const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getList,
  create,
  update,
  deleteVariant,
} = require("./product_variant.ctrl");

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteVariant);

module.exports = router;
