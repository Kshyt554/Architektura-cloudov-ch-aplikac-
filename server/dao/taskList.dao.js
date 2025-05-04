const TaskList = require('../models/taskList.model');

// Create a new TaskList
async function createTaskList(taskListData) {
  const taskList = new TaskList(taskListData);
  return await taskList.save();
}

// Get TaskList by ID
async function getTaskListById(taskListId) {
  return await TaskList.findById(taskListId);
}

// Get All TaskLists
async function getAllTaskLists() {
  return await TaskList.find();
}

// Update TaskList by ID
async function updateTaskList(taskListId, updatedData) {
  return await TaskList.findByIdAndUpdate(taskListId, updatedData, { new: true });
}

// Delete TaskList by ID
async function deleteTaskList(taskListId) {
  return await TaskList.findByIdAndDelete(taskListId);
}

module.exports = {
  createTaskList,
  getTaskListById,
  getAllTaskLists,
  updateTaskList,
  deleteTaskList,
};
