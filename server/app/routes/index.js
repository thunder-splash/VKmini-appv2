const Router = require ('express')
const router = new Router()
const userRouter = require('./userRouter')
const taskListRouter = require('./taskListRouter')
const taskRouter = require('./taskRouter')

router.use('/user', userRouter)
router.use('/tasklists', taskListRouter)
router.use('/tasks', taskRouter)

module.exports = router