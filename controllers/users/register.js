const { catchAsync } = require('../../utils');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const { userRegisterValidator } = require('../../utils');
const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const { error } = userRegisterValidator({
    name,
    email,
    password,
  });
  if (error) {
    throw createError(400, error.message);
  }

  // check if entered email already exists
  const userBD = await User.findOne({ email });
  if (userBD) {
    throw createError(409, `User with email ${email} already exist`);
  }

  await User.create({ name, email, password });

  const user = await User.findOne({ email });
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });

  user.password = undefined;
  user.token = undefined;

  res.status(201).json({
    status: 'added',
    code: 201,
    token,
    data: {
      user,
    },
  });
});

module.exports = register;
