const Task = require('../models/task');
const TaskList = require('../models/taskList'); 

async function createTask(taskData) {
  
  if (!taskData.projectId) {
    throw new Error('projectId обязателен');
  }

  const mongoose = require('mongoose');
  if (!mongoose.Types.ObjectId.isValid(taskData.projectId)) {
    throw new Error('Неверный формат projectId');
  }

  const taskListExists = await TaskList.findById(taskData.projectId);
  if (!taskListExists) {
    throw new Error('TaskList с таким projectId не найден');
  }

  const task = new Task(taskData);
  return await task.save();
}

// Остальные методы без изменений

async function deleteTask(taskId) {
  return await Task.findByIdAndDelete(taskId);
}

async function getTaskById(taskId) {
  return await Task.findById(taskId);
}

async function updateTask(taskId, updatedData) {
  return await Task.findByIdAndUpdate(taskId, updatedData, { new: true });
}

async function getAllTasks() {
  return await Task.find();
}

async function getTasksByState(state) {
  return await Task.find({ state });
}

module.exports = {
  createTask,
  deleteTask,
  getTaskById,
  updateTask,
  getAllTasks,
  getTasksByState,
};
