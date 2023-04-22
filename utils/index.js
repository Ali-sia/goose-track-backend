const catchAsync = require('./catchAsync');
const {
  contactDataValidator,
  updateContactStatusValidator,
} = require('./ContactValidation');
const {
  userLoginValidator,
  userRegisterValidator,
} = require('./userValidation');
// const userLoginValidator = require("./userValidation");

module.exports = {
  catchAsync,
  contactDataValidator,
  updateContactStatusValidator,
  userRegisterValidator,
  userLoginValidator,
};
