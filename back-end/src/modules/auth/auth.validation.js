const Joi = require("joi");
const { handleErrorDetail } = require("../../common/utils/validation");

const loginValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().max(255).required(),
  }).unknown(true);

  const { error } = schema.validate(body, { abortEarly: false });
  if (error) {
    return { result: false, errors: handleErrorDetail(error) };
  }

  return { result: true, errors: null };
};

module.exports = {
  loginValidation,
};
