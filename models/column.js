const { Schema, model } = require('mongoose');

const columnSchema = Schema(
  {
    title: {
      type: String,
    },
    number: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  { versionKey: false, timestamps: true }
);

const Column = model('column', columnSchema);

module.exports = Column;

