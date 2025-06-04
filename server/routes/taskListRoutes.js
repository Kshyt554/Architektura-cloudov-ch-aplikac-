const express = require('express');
const router = express.Router();
const taskListController = require('../controllers/taskListController');

router.get('/', taskListController.getAllTaskLists);
router.post('/', taskListController.createTaskList);
router.get('/:id', taskListController.getTaskListById);
router.put('/:id', taskListController.updateTaskList);
router.delete('/:id', taskListController.deleteTaskList);

module.exports = router;
