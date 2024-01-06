const TaskListRouter = require('express');
const router = new TaskListRouter();
const taskListController = require('../controllers/taskListController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const {taskListCreationValidator, deleteValidator} = require('../middlewares/validation');

router.post('/create', taskListCreationValidator, taskListController.create);
router.get('/', taskListController.getAll);
router.delete('/delete/:id', deleteValidator, taskListController.delete);

module.exports = router;
