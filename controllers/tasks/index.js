const getAll = require('./getAll');
const getById = require('./getById');
const postTask = require('./post');
const patchTask = require('./patch');
const deleteById = require('./delete');

module.exports = {
  getAll,
  getById,
  postTask,
  patchTask,
  deleteById,
};
