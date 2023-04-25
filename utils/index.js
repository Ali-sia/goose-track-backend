const catchAsync = require("./catchAsync");
const {

  taskDataValidator,
  // updateContactStatusValidator,
} = require('./ContactValidation');

const {
  userLoginValidator,
  userRegisterValidator,
  userUpdateValidator,
} = require("./userValidation");
const upload = require("./upload");
// const userLoginValidator = require("./userValidation");

module.exports = {
  catchAsync,
  taskDataValidator,
  // updateContactStatusValidator,
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
  upload,
};
