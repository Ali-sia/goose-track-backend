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
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().min(3).max(30),
    birthday: Joi.date().raw(),
    telegram: Joi.string().min(3).max(30),
    avatarURL: Joi.string(),
  });

  return schema.validate(data);
};

module.exports = {
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
};
