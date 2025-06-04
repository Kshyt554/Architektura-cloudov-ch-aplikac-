const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');
const TaskList = require('../models/taskList');

// Создание новой задачи с валидацией projectId
router.post('/', async (req, res) => {
  const {
    name,
    description,
    completed,
    projectId,
    priority,
    state,
    time,
    tags
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Неверный формат projectId' });
  }

  const taskListExists = await TaskList.findById(projectId);
  if (!taskListExists) {
    return res.status(404).json({ message: 'TaskList с таким projectId не найден' });
  }

  try {
    const newTask = new Task({
      name,
      description,
      completed,
      projectId,
      priority,
      state,
      time,
      tags
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error saving task:', err);
    res.status(400).json({ message: 'Ошибка при создании задачи', error: err.message });
  }
});

// Получить все задачи по projectId
router.get('/project/:projectId', async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ message: 'Неверный формат projectId' });
  }

  try {
    const tasks = await Task.find({ projectId });
    res.json(tasks);
  } catch (err) {
    console.error('Ошибка при загрузке задач:', err);
    res.status(500).json({ message: 'Ошибка при загрузке задач' });
  }
});

// Обновить задачу по taskId
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Неверный формат taskId' });
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    console.error('Ошибка при обновлении задачи:', err);
    res.status(500).json({ message: 'Ошибка при обновлении задачи' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Неверный формат taskId' });
  }

  try {
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json({ message: 'Задача успешно удалена' });
  } catch (err) {
    console.error('Ошибка при удалении задачи:', err);
    res.status(500).json({ message: 'Ошибка сервера при удалении задачи' });
  }
});

module.exports = router;
