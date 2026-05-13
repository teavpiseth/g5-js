const {
  resError,
  handleCreateResult,
  resSuccess,
} = require("../../common/utils/response");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("./product.validation");
const {
  createModal,
  detailWeb,
  list,
  listWeb,
  updateModal,
  deleteModal,
} = require("./product.model");

const getList = async (req, res, next) => {
  try {
    const result = await list();
    return resSuccess(res, result, "Products retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const getWebList = async (req, res, next) => {
  try {
    const { category_id } = req.query;

    if (!category_id) {
      return resError(res, "category_id is required", 400);
    }

    const categoryId = Number(category_id);
    if (!Number.isInteger(categoryId) || categoryId <= 0) {
      return resError(res, "category_id must be a positive integer", 400);
    }

    const result = await listWeb(categoryId);
    return resSuccess(res, result, "Products retrieved successfully");
  } catch (error) {
    next(error);
  }
};

const getWebDetail = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productId = Number(id);
    if (!Number.isInteger(productId) || productId <= 0) {
      return resError(res, "Product id must be a positive integer", 400);
    }

    const result = await detailWeb(productId);

    if (!result) {
      return resError(res, "Product not found", 404);
    }

    return resSuccess(res, result, "Product retrieved successfully");
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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = updateValidation({ id, ...req.body });
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await updateModal(req, res, next);

    if (result.affectedRows === 0) {
      return resError(res, "Product not found", 404);
    }

    return resSuccess(
      res,
      { id: Number(id), ...req.body },
      "Product updated successfully",
    );
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

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = deleteValidation({ id });
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await deleteModal(req, res, next);

    if (result.notFound || result.affectedRows === 0) {
      return resError(res, "Product not found", 404);
    }

    return resSuccess(
      res,
      {
        deletedId: Number(id),
        productName: result.productName,
      },
      `Product '${result.productName}' deleted successfully`,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  getWebList,
  getWebDetail,
  create,
  update,
  deleteProduct,
};
