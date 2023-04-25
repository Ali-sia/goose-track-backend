const catchAsync = require("./catchAsync");
const {
  contactDataValidator,
  updateContactStatusValidator,
} = require("./ContactValidation");
const {
  userLoginValidator,
  userRegisterValidator,
  userUpdateValidator,
} = require("./userValidation");
const upload = require("./upload");
// const userLoginValidator = require("./userValidation");

module.exports = {
  catchAsync,
  contactDataValidator,
  updateContactStatusValidator,
  userRegisterValidator,
  userLoginValidator,
  userUpdateValidator,
  upload,
};
