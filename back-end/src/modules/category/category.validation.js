const { handleErrorDetail } = require("../../common/utils/validation");
const Joi = require("joi");

const updateValidation = (body) => {
  const schema = Joi.object({
    id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    parent_id: Joi.alternatives()
      .try(Joi.string(), Joi.number())
      .required()
      .allow(null),
    image_url: Joi.string().required(),
    is_visible: Joi.number().required(),
    sort_order: Joi.number().required(),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }
  return { result: true, errors: null };
};

const createValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow("", null),
    parent_id: Joi.alternatives().try(Joi.string(), Joi.number()).allow(null),
    image_url: Joi.string().allow("", null),
    is_visible: Joi.number().default(1),
    sort_order: Joi.number(),
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
