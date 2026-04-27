const {
  resError,
  handleCreateResult,
  resSuccess,
} = require("../../common/utils/response");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("./user.validation");
const { createModal, list, updateModal, deleteModal } = require("./user.model");

const getList = async (req, res, next) => {
  try {
    const result = await list();
    return resSuccess(res, result, "Users retrieved successfully");
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
      username: req.body.username,
      email: req.body.email,
      is_active: req.body.is_active !== undefined ? req.body.is_active : 1,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return resError(res, "User with this email already exists", 409);
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
      return resError(res, "User not found", 404);
    }

    return resSuccess(
      res,
      {
        id: Number(id),
        username: req.body.username,
        email: req.body.email,
        is_active: req.body.is_active,
      },
      "User updated successfully",
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return resError(res, "User with this email already exists", 409);
    }

    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = deleteValidation({ id });
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await deleteModal(req, res, next);

    if (result.notFound || result.affectedRows === 0) {
      return resError(res, "User not found", 404);
    }

    return resSuccess(
      res,
      {
        deletedId: Number(id),
        username: result.username,
      },
      `User '${result.username}' deleted successfully`,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  deleteUser,
};
