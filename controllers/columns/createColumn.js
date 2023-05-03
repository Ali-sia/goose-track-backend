const createError = require('http-errors');

const { Column } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { columnValidator } = require('../../utils/index');

const createColumn = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { title, number, date } = req.body;

  const { error } = columnValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!title || !number ) {
    throw createError(400, 'missing required name field');
  }

  const result = await Column.create({ ...req.body, owner: _id });

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result },
  });
});

module.exports = createColumn;
