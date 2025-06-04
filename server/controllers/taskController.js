const mongoose = require('mongoose');
const Task = require('../models/task');
const TaskList = require('../models/taskList'); // Модель проектов

// Создание новой задачи
exports.createTask = async (req, res) => {
  try {
    const {
      name,
      description,
      completed = false,
      projectId,
      priority,
      state,
      time,
      tags,
    } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'projectId обязателен' });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Неверный формат projectId' });
    }

    const projectExists = await TaskList.findById(projectId);
    if (!projectExists) {
      return res.status(404).json({ message: 'Проект с таким projectId не найден' });
    }

    const task = new Task({
      name,
      description,
      completed,
      projectId,
      priority,
      state,
      time,
      tags,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Обновление существующей задачи по ID
exports.editTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Неверный формат taskId' });
    }

    const updatedFields = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      updatedFields,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Удаление задачи по ID
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Неверный формат taskId' });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    res.status(200).json({ message: 'Задача успешно удалена' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
  }
};
