// #TODO
// change controller for goose track`s needs

const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAll = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const { page = 1, limit = 5 } = req.query;
  const { filterDateFrom, filterDateTo, priority } = req.query

  const skip = (page - 1) * limit;

  // постоянный фильтр по овнеру тасков
  const filters = {
    owner: _id,
  }

  // фильтры которые могут быть/не быть (опциональные)
  if (filterDateFrom) {
    if (!filters.createdAt) {
      filters.createdAt = {};
    }
    filters.createdAt.$gte = new Date(filterDateFrom);
  }

  if (filterDateTo) {
    if (!filters.createdAt) {
      filters.createdAt = {};
    }
    filters.createdAt.$lte = new Date(filterDateTo);
  }
  if (priority) {
    if (!filters.priority) {
      filters.priority = "";
    }
  
    filters.priority = priority;
  }

  const contactsList = await Task.find(filters)
    .skip(skip)
    .limit(Number(limit))
    .populate('owner', '_id name email');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: contactsList
    },
  });
});

module.exports = getAll;

