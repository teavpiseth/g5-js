/**
 * Standardized API Response Utility Functions
 * Provides consistent response formats for success and error scenarios
 */

/**
 * Send a successful response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {Object} meta - Additional metadata (pagination, etc.)
 */
const resSuccess = (
  res,
  data = null,
  message = "Success",
  statusCode = 200,
  meta = null,
) => {
  const response = {
    success: true,
    status: statusCode,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  // Add metadata if provided (useful for pagination, etc.)
  if (meta) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {*} errors - Detailed error information
 * @param {string} errorCode - Custom error code for client handling
 */
const resError = (
  res,
  message = "Internal Server Error",
  statusCode = 500,
  errors = null,
  errorCode = null,
) => {
  const response = {
    success: false,
    status: statusCode,
    message,
    timestamp: new Date().toISOString(),
  };

  // Add detailed errors if provided (validation errors, etc.)
  if (errors) {
    response.errors = errors;
  }

  // Add custom error code if provided
  if (errorCode) {
    response.errorCode = errorCode;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {Array|Object} validationErrors - Validation error details
 * @param {string} message - Custom validation message
 */
const validationError = (
  res,
  validationErrors,
  message = "Validation failed",
) => {
  return resError(res, message, 400, validationErrors, "VALIDATION_ERROR");
};

/**
 * Send a not found error response
 * @param {Object} res - Express response object
 * @param {string} resource - Name of the resource not found
 */
const notFound = (res, resource = "Resource") => {
  return resError(res, `${resource} not found`, 404, null, "NOT_FOUND");
};

/**
 * Send an unauthorized error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom unauthorized message
 */
const unauthorized = (res, message = "Unauthorized access") => {
  return resError(res, message, 401, null, "UNAUTHORIZED");
};

/**
 * Send a forbidden error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom forbidden message
 */
const forbidden = (res, message = "Forbidden access") => {
  return resError(res, message, 403, null, "FORBIDDEN");
};

/**
 * Send a conflict error response
 * @param {Object} res - Express response object
 * @param {string} message - Custom conflict message
 */
const conflict = (res, message = "Resource already exists") => {
  return resError(res, message, 409, null, "CONFLICT");
};

/**
 * Send a created response (for POST requests)
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Success message
 */
const created = (
  res,
  data = null,
  message = "Resource created successfully",
) => {
  return resSuccess(res, data, message, 201);
};

/**
 * Send a paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Array of items
 * @param {Object} pagination - Pagination metadata
 * @param {string} message - Success message
 */
const paginated = (
  res,
  data,
  pagination,
  message = "Data retrieved successfully",
) => {
  const meta = {
    pagination: {
      page: pagination.page || 1,
      limit: pagination.limit || 10,
      total: pagination.total || 0,
      pages: Math.ceil((pagination.total || 0) / (pagination.limit || 10)),
    },
  };

  return resSuccess(res, data, message, 200, meta);
};

const handleUpdateResult = (res, result, id) => {
  if (result.affectedRows === 1) {
    return resSuccess(
      res,
      [],
      `Category with ID ${id} updated successfully`,
      200,
    );
  }
  return notFound(res, `Category with ID ${id}`);
};

module.exports = {
  resSuccess,
  resError,
  validationError,
  notFound,
  unauthorized,
  forbidden,
  conflict,
  created,
  paginated,
  handleUpdateResult,
};
