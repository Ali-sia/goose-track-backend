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
    title: {
      type: String,
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    date: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'High',
      trim: true,
    },
    category: {
      type: String,
      enum: ['To do', 'In progress', 'Done'],
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model('task', taskSchema);

module.exports = Task;
