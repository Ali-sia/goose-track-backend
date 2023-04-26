const createError = require('http-errors');

const { Column } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const deleteColumn = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;

  const result = await Column.findByIdAndDelete(id, _id);

  if (!result) {
    throw createError(404, 'Not found');
  }

  res.status(200).json({
    status: 'succes',
    code: 200,
    message: 'column deleted',
    data: { result },
  });
});

module.exports = deleteColumn;
