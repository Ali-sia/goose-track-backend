// #TODO
// change controller for goose track`s needs

const { Task } = require('../../models/index');
const createError = require('http-errors');

const { catchAsync } = require('../../utils/index');

const getById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Task.findById(contactId, _id).populate(
    'owner',
    '_id name email'
  );

  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
});

module.exports = getById;

