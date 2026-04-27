const Joi = require("joi");
const { handleErrorDetail } = require("../../common/utils/validation");

const createValidation = (body) => {
  const schema = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(255).required(),
    is_active: Joi.number().valid(0, 1).default(1),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }

  return { result: true, errors: null };
};

const updateValidation = (body) => {
  const schema = Joi.object({
    id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(255).allow("", null),
    is_active: Joi.number().valid(0, 1).required(),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }

  return { result: true, errors: null };
};

const deleteValidation = (params) => {
  const schema = Joi.object({
    id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  });

  const { error } = schema.validate(params, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }

  return { result: true, errors: null };
};

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
};
