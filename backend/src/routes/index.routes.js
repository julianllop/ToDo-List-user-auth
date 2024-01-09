const { Router } = require("express");

const rTasks = require("./task");
const rUser = require("./user");

const mainRouter = Router();

mainRouter.use("/tasks", rTasks);
mainRouter.use("/user", rUser);

module.exports = mainRouter;
