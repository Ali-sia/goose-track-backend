const createHttpError = require('http-errors');
const { getTasksValidator } = require('../../utils/taskValidation');

const validateRequest = (req, res, next) => {
  const { error, value } = getTasksValidator(req.query);
  if (error) { 
    return next(createHttpError(400, 'Missing required name field'));
    }
  req.query = value;
  next();
};

module.exports = validateRequest;
