const { catchAsync } = require('../../utils');

const current = catchAsync(async (req, res, next) => {
  const { name, email, avatarURL, birthday, phone, telegram, createdAt } =
    req.user;

  res.json({
    status: 'success',
    code: 200,
    data: {
      user: {
        name,
        email,
        avatarURL,
        birthday,
        phone,
        telegram,
        createdAt,
      },
    },
  });
});

module.exports = current;
