const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAll = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const { filterDateFrom, filterDateTo } = req.query

  const filters = {
    owner: _id,
    date: {
      $gte: filterDateFrom,
      $lte: filterDateTo
    }
  }
  const tasksList = await Task.find(filters).populate('owner', '_id name email');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: tasksList,
      start: filterDateFrom
    },
  });
});

module.exports = getAll;

