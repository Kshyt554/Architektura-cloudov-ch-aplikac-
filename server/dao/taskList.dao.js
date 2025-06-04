const TaskList = require('../models/taskList');

async function createTaskList(data) {
  const taskList = new TaskList({
    name: data.name,
    description: data.description,
    solved: data.solved || false,  // если не передано — по умолчанию false
  });
  return await taskList.save();
}

async function getAllTaskLists() {
  return await TaskList.find();
}

async function getTaskListById(id) {
  return await TaskList.findById(id);
}

async function updateTaskList(id, data) {
  return await TaskList.findByIdAndUpdate(
    id,
    {
      name: data.name,
      description: data.description,
      solved: data.solved,  // обновляем solved, если передано
    },
    { new: true }
  );
}

async function deleteTaskList(id) {
  return await TaskList.findByIdAndDelete(id);
}

module.exports = {
  createTaskList,
  getAllTaskLists,
  getTaskListById,
  updateTaskList,
  deleteTaskList,
};
