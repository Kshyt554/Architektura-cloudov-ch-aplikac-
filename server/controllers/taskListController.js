const TaskList = require('../models/taskList');

exports.createTaskList = async (req, res) => {
  try {
    const taskList = new TaskList({ title: req.body.title });
    await taskList.save();
    res.status(201).json(taskList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllTaskLists = async (req, res) => {
  try {
    const taskLists = await TaskList.find();
    res.status(200).json(taskLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTaskListById = async (req, res) => {
  try {
    const taskList = await TaskList.findById(req.params.id);
    if (!taskList) return res.status(404).json({ message: 'TaskList not found' });
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTaskList = async (req, res) => {
  try {
    const taskList = await TaskList.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true });
    if (!taskList) return res.status(404).json({ message: 'TaskList not found' });
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTaskList = async (req, res) => {
  try {
    const taskList = await TaskList.findByIdAndDelete(req.params.id);
    if (!taskList) return res.status(404).json({ message: 'TaskList not found' });
    res.status(200).json({ message: 'TaskList deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
