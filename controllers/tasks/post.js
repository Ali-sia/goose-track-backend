// #TODO
// change controller for goose track`s needs

const createError = require('http-errors');

const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { contactDataValidator } = require('../../utils/index');

const postTask = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone } = req.body;

  const { error } = contactDataValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!name || !email || !phone) {
    throw createError(400, 'missing required name field');
  }

  const result = await Task.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result },
  });
});

module.exports = postTask;
