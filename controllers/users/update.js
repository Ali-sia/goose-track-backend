const createError = require("http-errors");
const fs = require("fs/promises");
const Jimp = require("jimp");
const cloudinary = require("cloudinary").v2;

const { catchAsync } = require("../../utils/index");
const { userUpdateValidator } = require("../../utils");
const { User } = require("../../models");

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

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
      const avatar = await Jimp.read(tempUpload);

      if (!avatar) {
        throw createError(400, "Download users avatar error");
      }

      const cloudinaryUpload = await cloudinary.uploader.upload(tempUpload, {
        public_id: avatarName,
        folder: "public/avatars",
        crop: "fill",
        width: 200,
        height: 200,
        gravity: "face",
      });

      await fs.unlink(tempUpload);

      avatarURL = cloudinaryUpload.secure_url;
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        name,
        birthday,
        email,
        phone,
        telegram,
        avatarURL,
      },
      { new: true }
    ).select("name birthday email phone telegram avatarURL");

    res.json({
      status: "success",
      code: 200,
      data: {
        user: updatedUser,
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
