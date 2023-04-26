const { Column } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAllColumns = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const filters = {
    owner: _id,
  }

  const columnsList = await Column.find(filters)
    .populate('owner', '_id title number');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: columnsList
    },
  });
});

module.exports = getAllColumns;
