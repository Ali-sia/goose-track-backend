const catchAsync = require('./catchAsync');
const {
  taskDataValidator,
  // updateContactStatusValidator,
} = require('./ContactValidation');
const {
  userLoginValidator,
  userRegisterValidator,
} = require('./userValidation');
// const userLoginValidator = require("./userValidation");

module.exports = {
  catchAsync,
  taskDataValidator,
  // updateContactStatusValidator,
  userRegisterValidator,
  userLoginValidator,
};
