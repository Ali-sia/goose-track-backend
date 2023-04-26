// #TODO
// change controller for goose track`s needs

const createError = require('http-errors');

const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const deleteById = catchAsync(async (req, res, next) => {
  const { taskId } = req.params;
  const { _id } = req.user;

  const result = await Task.findByIdAndDelete(taskId, _id);

  if (!result) {
    throw createError(404, 'Not found');
  }

  res.status(200).json({
    status: 'succes',
    code: 200,
    message: 'contact deleted',
    data: { result },
  });
});

module.exports = deleteById;
