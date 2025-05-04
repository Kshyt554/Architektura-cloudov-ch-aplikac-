const express = require('express');
const router = express.Router();

// Импорт модели TaskList
const TaskList = require('../models/taskList');

// Получить все списки задач
router.get('/', async (req, res) => {
  try {
    const taskLists = await TaskList.find(); // Ищем все списки задач в базе данных
    res.json(taskLists);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении списков задач', error: err });
  }
});

// Создать новый список задач
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTaskList = new TaskList({
      title,
      description,
    });

    const savedTaskList = await newTaskList.save();
    res.status(201).json(savedTaskList);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании списка задач', error: err });
  }
});

// Получить список задач по ID
router.get('/:id', async (req, res) => {
  try {
    const taskList = await TaskList.findById(req.params.id);
    if (!taskList) {
      return res.status(404).json({ message: 'Список задач не найден' });
    }
    res.json(taskList);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении списка задач', error: err });
  }
});

// Обновить список задач по ID
router.put('/:id', async (req, res) => {
  try {
    const updatedTaskList = await TaskList.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTaskList) {
      return res.status(404).json({ message: 'Список задач не найден' });
    }
    res.json(updatedTaskList);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при обновлении списка задач', error: err });
  }
});

// Удалить список задач по ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTaskList = await TaskList.findByIdAndDelete(req.params.id);
    if (!deletedTaskList) {
      return res.status(404).json({ message: 'Список задач не найден' });
    }
    res.json({ message: 'Список задач удален' });
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при удалении списка задач', error: err });
  }
});

module.exports = router;
