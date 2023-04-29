const createError = require('http-errors');

const { Column } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { columnValidator } = require('../../utils/index');

const changeColumn = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, number } = req.body;
  const { _id } = req.user;

  const { error } = columnValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!title || !number) {
    throw createError(400, 'missing field');
  }

  const result = await Column.findByIdAndUpdate(
    id,
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

module.exports = changeColumn;