// #TODO
// create new schema for tasks
// {title, start, end, priority, date, category, owner}

const { Schema, model } = require('mongoose');

// це залишила, щоб працювало
const taskSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model('contact', taskSchema);

module.exports = Task;
