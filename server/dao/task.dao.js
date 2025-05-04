const Task = require('../models/task.model');

// Create a new Task
async function createTask(taskData) {
  const task = new Task(taskData);
  return await task.save();
}

// Delete a Task by ID
async function deleteTask(taskId) {
  return await Task.findByIdAndDelete(taskId);
}

// Get Task by ID
async function getTaskById(taskId) {
  return await Task.findById(taskId);
}

// Update Task by ID
async function updateTask(taskId, updatedData) {
  return await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
}

// Get All Tasks
async function getAllTasks() {
  return await Task.find();
}

// Get Tasks by Status
async function getTasksByStatus(status) {
  return await Task.find({ status });
}

module.exports = {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
  getAllTasks,
  getTasksByStatus,
};
