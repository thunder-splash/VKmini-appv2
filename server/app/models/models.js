const sequelize = require('../db')
const {INTEGER, STRING, BOOLEAN} = require('sequelize')


const User = sequelize.define ('user', {
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING, defaultValue: "Иванов Иван Иванович"},
    vkId: {type: INTEGER},
})

const Task = sequelize.define ('task',{
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING},
    completed: {type: BOOLEAN, defaultValue: false},
    title: {type: STRING}
});

const TaskList = sequelize.define ('task__list',{
    id: {type: INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: STRING},
    title: {type: STRING},
});


User.hasMany(TaskList)
TaskList.belongsTo(User)

TaskList.hasMany(Task)
Task.belongsTo(TaskList)


module.exports = {
    User,
    Task,
    TaskList
}