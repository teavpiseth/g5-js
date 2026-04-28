const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getList,
  create,
  update,
  deleteVariant,
  uploadImages,
  getImages,
} = require("./product_variant.ctrl");
const upload = require("../../middleware/uploadFile");

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteVariant);
router.get("/:id/images", getImages);
router.post("/:id/images", upload.array("images", 10), uploadImages);

module.exports = router;
