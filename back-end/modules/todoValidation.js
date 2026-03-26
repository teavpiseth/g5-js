const Joi = require("joi");

// Schema for PUT todo validation
const putTodoSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 200 characters",
  }),

  description: Joi.string().trim().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.base": "Description must be a string",
  }),

  status: Joi.string()
    .valid("pending", "complete", "in progress")
    .optional()
    .messages({
      "any.only": "Status must be one of: pending, complete, in progress",
    }),

  priority: Joi.string()
    .valid("H", "M", "L")
    .messages({
      "any.only": "Priority must be one of: H (High), M (Medium), L (Low)",
    })
    .required(),
});

// Schema for POST todo validation
const postTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character long",
    "string.max": "Title cannot exceed 200 characters",
  }),

  description: Joi.string().trim().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.base": "Description must be a string",
  }),

  status: Joi.string()
    .valid("pending", "complete", "in progress")
    .default("pending")
    .messages({
      "any.only": "Status must be one of: pending, complete, in progress",
    }),

  priority: Joi.string().valid("H", "M", "L").default("M").messages({
    "any.only": "Priority must be one of: H (High), M (Medium), L (Low)",
  }),
});

// Schema for ID parameter validation
const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "any.required": "ID is required",
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.positive": "ID must be a positive number",
  }),
});

// Validation middleware for PUT todo
const validatePutTodo = (req, res, next) => {
  // Validate request body
  const { error: bodyError, value: bodyValue } = putTodoSchema.validate(
    req.body,
  );

  if (bodyError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: bodyError.details.map((detail) => detail.message),
    });
  }

  // Store validated data
  req.validatedBody = bodyValue;

  next();
};

// Validation middleware for POST todo
const validatePostTodo = (req, res, next) => {
  const { error, value } = postTodoSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      details: error.details.map((detail) => detail.message),
    });
  }

  req.validatedBody = value;
  next();
};

// Validation middleware for ID parameter only
const validateIdParam = (req, res, next) => {
  const { error } = idParamSchema.validate({ id: parseInt(req.params.id) });

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID parameter",
      details: error.details.map((detail) => detail.message),
    });
  }

  req.validatedParams = { id: parseInt(req.params.id) };
  next();
};

module.exports = {
  validatePutTodo,
  validatePostTodo,
  validateIdParam,
  putTodoSchema,
  postTodoSchema,
  idParamSchema,
};
