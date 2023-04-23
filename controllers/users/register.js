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
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `User with email ${email} already exist`);
  }

  const newUser = await User.create({ name, email, password });
  console.log('---> ~ register ~ newUser:', newUser);

  newUser.password = undefined;

  const createdUser = await User.findOne({ email });
  const payload = { id: createdUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(createdUser._id, { token });

  res.status(201).json({
    status: 'added',
    code: 201,
    token,
    data: {
      user: {
        name,
        email,
      },
    },
  });
});

module.exports = register;
