const {
  resError,
  resSuccess,
  handleUpdateResult,
  handleCreateResult,
  notFound,
} = require("../../common/utils/response");
const {
  list,
  createModal,
  updateModal,
  deleteModal,
  createImageModal,
  listImages,
} = require("./product_variant.model");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("./product_variant.validation");

const getList = async (req, res, next) => {
  try {
    const { product_id } = req.params;
    const result = await list(product_id);
    res.json({
      success: true,
      data: result,
      message: "Product variants retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const validate = createValidation(req.body);
    if (!validate.result)
      return resError(res, "Validation failed", 400, validate.errors);

    const result = await createModal(req);
    return handleCreateResult(res, result);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return resError(res, "SKU already exists", 409);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = updateValidation({ id, ...req.body });
    if (!validate.result)
      return resError(res, "Validation failed", 400, validate.errors);

    const result = await updateModal(req);
    return handleUpdateResult(res, result, id);
  } catch (error) {
    next(error);
  }
};

const deleteVariant = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = deleteValidation({ id });
    if (!validate.result)
      return resError(res, "Validation failed", 400, validate.errors);

    const result = await deleteModal(req);
    if (result.notFound) return notFound(res, "Product variant");
    if (result.affectedRows === 0) return notFound(res, "Product variant");

    return resSuccess(
      res,
      { deletedId: parseInt(id) },
      "Product variant deleted successfully",
    );
  } catch (error) {
    next(error);
  }
};

const uploadImages = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.files || req.files.length === 0) {
      return resError(res, "No images uploaded", 400);
    }

    const inserted = [];
    for (let i = 0; i < req.files.length; i += 1) {
      const file = req.files[i];
      const imageUrl = `/uploads/${file.filename}`;

      const result = await createImageModal({
        variantId: id,
        imageUrl,
        altText: null,
        isPrimary: i === 0,
        displayOrder: i,
      });

      inserted.push({
        id: result.insertId,
        variant_id: Number(id),
        image_url: imageUrl,
        is_primary: i === 0 ? 1 : 0,
        display_order: i,
      });
    }

    return resSuccess(
      res,
      inserted,
      "Variant images uploaded successfully",
      201,
    );
  } catch (error) {
    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return resError(res, "Product variant not found", 404);
    }
    next(error);
  }
};

const getImages = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await listImages(id);
    return resSuccess(res, result, "Variant images retrieved successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  deleteVariant,
  uploadImages,
  getImages,
};
