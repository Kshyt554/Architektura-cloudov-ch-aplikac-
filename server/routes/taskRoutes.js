const express = require('express');
const router = express.Router();

// Импорт модели Task
const Task = require('../models/task');

// Получить все задачи
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find(); // Ищем все задачи в базе данных
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении задач', error: err });
  }
});

// Создать новую задачу
router.post('/', async (req, res) => {
  const { title, description, completed, taskListId } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      completed,
      taskListId,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании задачи', error: err });
  }
});

// Получить задачу по ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении задачи', error: err });
  }
});

// Обновить задачу по ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении задачи', error: err });
  }
});

// Удалить задачу по ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }
    res.json({ message: 'Задача удалена' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении задачи', error: err });
  }
});

module.exports = router;
