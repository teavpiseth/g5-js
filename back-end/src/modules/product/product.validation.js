const Joi = require("joi");
const { handleErrorDetail } = require("../../common/utils/validation");

const createValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    slug: Joi.string().max(255).required(),
    description: Joi.string().allow("", null),
    category_id: Joi.alternatives().try(Joi.string(), Joi.number()).allow(null),
    brand: Joi.string().max(100).allow("", null),
    base_price: Joi.number().min(0).allow(null),
    is_active: Joi.number().valid(0, 1).default(1),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }

  return { result: true, errors: null };
};

module.exports = {
  createValidation,
};
