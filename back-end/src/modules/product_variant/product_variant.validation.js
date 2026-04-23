const Joi = require("joi");
const { handleErrorDetail } = require("../../common/utils/validation");

const createValidation = (body) => {
  const schema = Joi.object({
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    size: Joi.string().allow("", null),
    color: Joi.string().allow("", null),
    sku: Joi.string().allow("", null),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) return { result: false, errors: handleErrorDetail(error) };
  return { result: true, errors: null };
};

const updateValidation = (body) => {
  const schema = Joi.object({
    id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    size: Joi.string().allow("", null),
    color: Joi.string().allow("", null),
    sku: Joi.string().allow("", null),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) return { result: false, errors: handleErrorDetail(error) };
  return { result: true, errors: null };
};

const deleteValidation = (params) => {
  const schema = Joi.object({
    id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
  });

  const { error } = schema.validate(params, { abortEarly: false });
  if (error) return { result: false, errors: handleErrorDetail(error) };
  return { result: true, errors: null };
};

module.exports = { createValidation, updateValidation, deleteValidation };
