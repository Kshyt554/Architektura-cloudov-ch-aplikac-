const mongoose = require('mongoose');

const taskListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
    solved: {
    type: Boolean,
    default: false, 
  },
}, { timestamps: true });

module.exports = mongoose.model('TaskList', taskListSchema);
