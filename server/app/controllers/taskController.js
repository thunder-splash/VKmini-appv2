// TaskController.js
const ApiError = require('../error/ApiError');
const { Task } = require('../models/models');

class TaskController {
    async create(req, res, next) {
        try {
            const { name, title, completed, taskListId } = req.body;
            const task = await Task.create({ name, title, completed, taskListId });
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res, next) {
        try {
            const { taskListId } = req.query;
            const tasks = await Task.findAll({ where: { taskListId } });
            return res.json(tasks);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const task = await Task.destroy({ where: { id } });
            return res.json(task);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new TaskController();
