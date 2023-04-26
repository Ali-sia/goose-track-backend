const { catchAsync } = require("../../utils");

const current = catchAsync(async (req, res, next) => {
  const { name, email, avatarURL, birthday, phone, telegram } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      user: {
        name,
        email,
        avatarURL,
        birthday,
        phone,
        telegram,
      },
    },
  });
});

module.exports = current;
