// #TODO
// change controller for goose track`s needs

const createError = require('http-errors');

const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { contactDataValidator } = require('../../utils/index');

const patchTask = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { title, start, end, priority } = req.body;
  const { _id } = req.user;

  const { error } = contactDataValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!title || !start || !end || !priority) {
    throw createError(400, 'missing field');
  }

  const result = await Task.findByIdAndUpdate(
    contactId,
    req.body,
    {
      new: true,
    },
    _id
  );

  
  
  if (!result) {
    throw createError(404, 'Not found');
  }
console.log('result ==>', !result)
  res.json({
    status: 'success',
    code: 200,
    message: 'updated',
    data: { result },
  });
});

module.exports = patchTask;

