const { Router } = require("express");
const {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTasks,
    deleteTask,
} = require("../controllers/task.controller");

const taskRouter = Router();

taskRouter.get("/", getTasks);

taskRouter.get("/:id", getTask);

taskRouter.post("/", createTask);

taskRouter.put("/:id", updateTask);

taskRouter.delete("/", deleteTasks);

taskRouter.delete("/:id", deleteTask);

module.exports = taskRouter;
