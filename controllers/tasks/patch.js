const createError = require('http-errors');
const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');
const { taskDataValidator } = require('../../utils/index');

const patchTask = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { title, start, end, priority, date } = req.body;
  const { _id } = req.user;

  const { error } = taskDataValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!title || !start || !end || !priority) {
    throw createError(400, 'missing field');
  }

  const result = await Task.findByIdAndUpdate(
    taskId,
    req.body,
    {
      new: true,
    },
    _id
  );

  if (!result) {
    throw createError(404, 'Not found');
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'updated',
    data: { result },
  });
});

module.exports = patchTask;
