const TaskRouter = require('express');
const router = new TaskRouter();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRoleMiddleware');
const {taskCreationValidator, deleteValidator} = require('../middlewares/validation');

router.post('/create', taskCreationValidator, taskController.create);
router.get('/', taskController.getAll);
router.delete('/delete/:id', deleteValidator, taskController.delete);

module.exports = router;
