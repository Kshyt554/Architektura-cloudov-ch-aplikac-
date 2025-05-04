const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
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
  taskListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaskList',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
