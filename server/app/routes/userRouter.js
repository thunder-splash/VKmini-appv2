const UserRouter = require('express')
const router = new UserRouter()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const checkRole = require('../middlewares/checkRoleMiddleware')
const {userRegistrationValidator, deleteValidator} = require('../middlewares/validation');


router.post('/registration', userRegistrationValidator, userController.registration);
router.post('/login', userController.login)
router.get('/', userController.getAll)
router.get('/:id', userController.getOne)
router.delete('/delete/:id', deleteValidator, userController.delete);

module.exports = router