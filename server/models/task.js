const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true,
  },
  priority: {
    type: String,
    enum: ['must-have', 'should-have', 'could-have', 'dont-have'],
    required: true,
  },
  state: {
    type: String,
    enum: ['in-progress', 'solved', 'waiting'],
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
