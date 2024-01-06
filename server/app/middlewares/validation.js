const { check } = require('express-validator');

exports.userRegistrationValidator = [
    check('vkId').isLength({ min: 1 }).withMessage('vkId is required'),
    check('last_name').isLength({ min: 1 }).withMessage('Last name is required'),
    check('first_name').isLength({ min: 1 }).withMessage('First name is required'),
];

exports.taskCreationValidator = [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('title').isLength({ min: 1 }).withMessage('Title is required'),
    check('completed').isBoolean().withMessage('Completed must be a boolean'),
    check('taskListId').isInt().withMessage('TaskList ID must be an integer'),
];

exports.taskListCreationValidator = [
    check('name').isLength({ min: 1 }).withMessage('Name is required'),
    check('title').isLength({ min: 1 }).withMessage('Title is required'),
    check('userId').isInt().withMessage('User ID must be an integer'),
];

exports.deleteValidator = [
    check('id').isInt().withMessage('ID must be an integer'),
];