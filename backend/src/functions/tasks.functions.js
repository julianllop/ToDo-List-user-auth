const { Task } = require("../db");

const getTasksFromDB = async (id) => {
    const tasks = await Task.findAll({
        where: {
            userId: id,
        },
    });

    return tasks;
};

const getTaskFromDB = async (id) => {
    const task = await Task.findByPk(id);
    if (!task) return null;
    return task;
};

const createTaskInDB = async (title, description, userId) => {
    const newTask = await Task.create({ title, description, userId });

    return newTask;
};

const updateTaskInDB = async (id, newTitle, newDescription) => {
    const updatedTask = await Task.findByPk(id);

    if (!updatedTask) throw Error("Task not found!");

    updatedTask.title = newTitle;
    updatedTask.description = newDescription;

    await updatedTask.save();

    return updatedTask;
};

const deleteTasksInDB = async () => {
    const deletedRows = await Task.destroy({ where: {}, truncate: true });

    return deletedRows;
};

const deleteTaskInDB = async (id) => {
    const task = await Task.findByPk(id);

    if (!task) {
        throw new Error("Task not found");
    }

    await task.destroy();
};

module.exports = {
    getTasksFromDB,
    getTaskFromDB,
    createTaskInDB,
    updateTaskInDB,
    deleteTasksInDB,
    deleteTaskInDB,
};
