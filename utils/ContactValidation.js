const Joi = require('joi');

const contactDataValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    priority: Joi.string().required(),
  });

  return schema.validate(data);
};

// const updateContactStatusValidator = (data) => {
//   const schema = Joi.object({
//     favorite: Joi.boolean().required(),
//   });

//   return schema.validate(data);
// };

module.exports = {
  contactDataValidator,
  // updateContactStatusValidator
};

