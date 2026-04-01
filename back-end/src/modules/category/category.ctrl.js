const {
  resError,
  handleUpdateResult,
  resSuccess,
} = require("../../common/utils/response");
const { list } = require("./category.model");
const { updateValidation, deleteValidation } = require("./category.validation");
const { updateModal, deleteModal } = require("./category.model");

const getList = async (req, res, next) => {
  try {
    const result = await list();
    res.json({
      success: true,
      data: result,
      message: "Categories retrieved successfully",
    });
  } catch (error) {
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
    return handleUpdateResult(res, result, id);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = deleteValidation({ id });
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await deleteModal(req, res, next);

    if (result.notFound) {
      return resError(res, "Category not found", 404);
    }

    if (result.hasChildren) {
      return resError(
        res,
        "Cannot delete category that has child categories. Please delete or reassign child categories first.",
        400,
      );
    }

    if (result.affectedRows === 0) {
      return resError(res, "Category not found", 404);
    }

    return resSuccess(
      res,
      {
        deletedId: parseInt(id),
        categoryName: result.categoryName,
      },
      `Category '${result.categoryName}' deleted successfully`,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  update,
  deleteCategory,
};
