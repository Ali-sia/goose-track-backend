const Joi = require('joi');

const taskDataValidator = (data) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(30).required(),
    start: Joi.string().required(),
    end: Joi.string().required(),
    date: Joi.date().iso().required(),
    priority: Joi.string().required(),
  });

  return schema.validate(data);
};

const getTasksValidator = (data) => {
  const schema = Joi.object({
    filterDateFrom: Joi.date().iso().required(),
    filterDateTo: Joi.date().iso().required(),
  }).options({
    abortEarly: false,
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
  taskDataValidator,
  getTasksValidator,
  // updateContactStatusValidator
};

