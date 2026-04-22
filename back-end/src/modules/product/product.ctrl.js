const {
  resError,
  handleCreateResult,
  resSuccess,
} = require("../../common/utils/response");
const { createValidation } = require("./product.validation");
const { createModal, list } = require("./product.model");

const getList = async (req, res, next) => {
  try {
    const result = await list();
    return resSuccess(res, result, "Products retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const validate = createValidation(req.body);
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await createModal(req, res, next);

    return handleCreateResult(res, result, {
      name: req.body.name,
      slug: req.body.slug,
      description: req.body.description || null,
      category_id: req.body.category_id || null,
      brand: req.body.brand || null,
      base_price: req.body.base_price ?? null,
      is_active: req.body.is_active !== undefined ? req.body.is_active : 1,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return resError(res, "Product with this slug already exists", 409);
    }

    if (error.code === "ER_NO_REFERENCED_ROW_2") {
      return resError(res, "Selected category does not exist", 400);
    }

    next(error);
  }
};

module.exports = {
  getList,
  create,
};
