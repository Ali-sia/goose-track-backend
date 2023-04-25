const createError = require("http-errors");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const { catchAsync } = require("../../utils/index");
const { userUpdateValidator } = require("../../utils");
const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const update = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { name, birthday, email, phone, telegram } = req.body;

  const { error } = userUpdateValidator({
    name,
    birthday,
    email,
    phone,
    telegram,
  });
  if (error) {
    throw createError(400, error.message);
  }

  let tempUpload = null;
  let { avatarURL } = req.body;

  try {
    if (req.file) {
      const originalname = req.file.originalname;
      const avatarName = `${_id}_${originalname}`;
      tempUpload = req.file.path;
      const resultUpload = path.join(avatarsDir, avatarName);
      const avatar = await Jimp.read(tempUpload);

      if (!avatar) {
        throw createError(400, "Download users avatar error");
      }
      avatar
        .autocrop()
        .resize(250, 250, Jimp.RESIZE_BEZIER)
        .write(resultUpload);
      await fs.unlink(tempUpload);

      avatarURL = path.join("public", "avatars", avatarName);
    }

    await User.findByIdAndUpdate(_id, {
      name,
      birthday,
      email,
      phone,
      telegram,
      avatarURL,
    });

    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          name,
          birthday,
          email,
          phone,
          telegram,
          avatarURL,
        },
      },
    });
  } catch (error) {
    if (!tempUpload) {
      await fs.unlink(tempUpload);
    }
    next(error);
  }
});

module.exports = update;
