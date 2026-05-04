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
const authMiddleware = require("../../middleware/authMiddleware");

router.use(authMiddleware);

router.get("/", getList);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", deleteVariant);
router.get("/:id/images", getImages);
router.post("/:id/images", upload.array("images", 10), uploadImages); // becareful append name "images" must match with formData key in front-end

module.exports = router;
