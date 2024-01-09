const { Task } = require("../db");
const db = require("../db");

const {
    getTasksFromDB,
    getTaskFromDB,
    createTaskInDB,
    updateTaskInDB,
    deleteTasksInDB,
    deleteTaskInDB,
} = require("../functions/tasks.functions");

const getTasks = async (req, res) => {
    const { userId } = req.query;

    try {
        const tasks = await getTasksFromDB(userId);
        res.status(201).json(tasks);
    } catch (error) {
        res.status(404).json({
            message: "Tasks not found",
            error: error.message,
        });
    }
};

const getTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await getTaskFromDB(id);

        if (!task) {
            return res.status(404).json({
                message: `Task Nº: ${id} not found`,
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({
            message: `Task Nº: ${id} not found`,
            error: error.message,
        });
    }
};

const createTask = async (req, res) => {
    const {} = req.params;
    const { title, description, id } = req.body;

    try {
        const newTask = await createTaskInDB(title, description, id);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({
            message: "Error at creating new task",
            error: error.message,
        });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const updatedTask = await updateTaskInDB(id, title, description);
        res.status(201).json(updatedTask);
    } catch (error) {
        res.status(400).json({
            message: "Error at updating task",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    // const { id } = req.params;
    // const { title, description } = req.body;
    // try {
    //     const updatedTask = await updateTaskInDB(id, title, description);
    //     res.status(201).json(updatedTask);
    // } catch (error) {
    //     res.status(400).json({
    //         message: "Error at updating task",
    //         error: error.message,
    //     });
    // }
};
const logout = async (req, res) => {
    // const { id } = req.params;
    // const { title, description } = req.body;
    // try {
    //     const updatedTask = await updateTaskInDB(id, title, description);
    //     res.status(201).json(updatedTask);
    // } catch (error) {
    //     res.status(400).json({
    //         message: "Error at updating task",
    //         error: error.message,
    //     });
    // }
};

const deleteTasks = async (req, res) => {
    try {
        const deletedTasks = await deleteTasksInDB();
        res.status(201).json(deletedTasks);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting tasks",
            error: error.message,
        });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await deleteTaskInDB(id);
        res.status(201).json(deletedTask);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting task",
            error: error.message,
        });
    }
};

module.exports = {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTasks,
    deleteTask,
};
