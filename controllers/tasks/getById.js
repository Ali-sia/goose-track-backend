// #TODO
// change controller for goose track`s needs

const { Task } = require('../../models/index');
const createError = require('http-errors');

const { catchAsync } = require('../../utils/index');

const getById = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { _id } = req.user;

  const result = await Task.findById(taskId, _id).populate(
    'owner',
    '_id name email'
  );

  if (!result) {
    throw createError(404, `Task with id ${taskId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
});

module.exports = getById;
