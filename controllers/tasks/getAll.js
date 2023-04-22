// #TODO
// change controller for goose track`s needs

const { Task } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAll = catchAsync(async (req, res, next) => {
  const { _id } = req.user;

  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;

  const contactsList = await Task.find({
    owner: _id,
    favorite: favorite || { $in: [true, false] },
  })
    .skip(skip)
    .limit(Number(limit))
    .populate('owner', '_id name email');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contactsList },
  });
});

module.exports = getAll;
