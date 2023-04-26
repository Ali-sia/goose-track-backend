const Joi = require('joi');

const columnValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    number: Joi.number().required(),
  });

  return schema.validate(data);
};

module.exports = {
  columnValidator,
};

