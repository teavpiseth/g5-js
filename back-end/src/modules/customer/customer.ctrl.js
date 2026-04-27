const {
  resError,
  handleCreateResult,
  resSuccess,
} = require("../../common/utils/response");
const {
  createValidation,
  updateValidation,
  deleteValidation,
} = require("./customer.validation");
const {
  createModal,
  list,
  updateModal,
  deleteModal,
} = require("./customer.model");

const getList = async (req, res, next) => {
  try {
    const result = await list();
    return resSuccess(res, result, "Customers retrieved successfully");
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

    const result = await createModal(req);

    return handleCreateResult(res, result, {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      is_active: req.body.is_active !== undefined ? req.body.is_active : 1,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return resError(res, "Customer with this email already exists", 409);
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

    const result = await updateModal(req);

    if (result.affectedRows === 0) {
      return resError(res, "Customer not found", 404);
    }

    return resSuccess(
      res,
      {
        id: Number(id),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        is_active: req.body.is_active,
      },
      "Customer updated successfully",
    );
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return resError(res, "Customer with this email already exists", 409);
    }
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validate = deleteValidation({ id });
    if (!validate.result) {
      return resError(res, "Validation failed", 400, validate.errors);
    }

    const result = await deleteModal(req);

    if (result.notFound || result.affectedRows === 0) {
      return resError(res, "Customer not found", 404);
    }

    return resSuccess(
      res,
      {
        deletedId: Number(id),
        customerName: result.customerName,
      },
      `Customer '${result.customerName}' deleted successfully`,
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getList,
  create,
  update,
  deleteCustomer,
};
