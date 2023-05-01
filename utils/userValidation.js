const Joi = require("joi");

const userRegisterValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const userLoginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().required(),
  });

  return schema.validate(data);
};

const userUpdateValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(16),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().min(3).max(16).allow(""),
    birthday: Joi.date().allow(""),
    telegram: Joi.string().min(3).max(16).allow(""),
    avatarURL: Joi.string().allow(""),
  });

  return schema.validate(data);
};

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
};
