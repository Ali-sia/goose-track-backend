// #TODO
// update schema for goose track
// {name, password, avatar, email, birthday, phone, skype/telegram}

const { Schema, model } = require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for user'],
    },
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    avatarURL: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    birthday: {
      type: Date,
      default: null,
    },
    telegram: {
      type: String,
      default: '',
    },
    token: { type: String, default: null },
  },
  { versionKey: false, timestamps: true }
);

// Pre save hook // create save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Custom method
userSchema.methods.checkPassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

const User = model('user', userSchema);

module.exports = User;
