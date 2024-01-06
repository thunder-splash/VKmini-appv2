const ApiError = require('../error/ApiError');
const { TaskList} = require('../models/models');

class TaskListController {
    async create(req, res, next) {
        try {
            const { name, title, userId } = req.body;
            const taskList = await TaskList.create({ name, title, userId });
            return res.json(taskList);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.query;
            const userTaskLists = await TaskList.findAll({ where: { userId } });
            return res.json(userTaskLists);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const taskList = await TaskList.destroy({ where: { id } });
            return res.json(taskList);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TaskListController();
