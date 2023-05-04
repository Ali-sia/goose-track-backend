// #TODO
// create new schema for tasks
// {title, start, end, priority, date, category, owner}

const { Schema, model } = require('mongoose');

// це залишила, щоб працювало
const taskSchema = Schema(
  {
    title: {
      type: String,
      defaulf: 'Title'
    },
    start: {
          type: String,
    },
    end: {
      type: String,
    },
    date: {
      type: Date,
      default: new Date(),
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'high',
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
     description: {
       type: String,
       default:"",
    },
  },
  { versionKey: false, timestamps: true }
);

const Task = model('task', taskSchema);

module.exports = Task;

