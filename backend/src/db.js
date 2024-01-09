require("dotenv").config();
const { Sequelize } = require("sequelize");
const TaskModel = require("./models/Task");
const UserModel = require("./models/User");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE, DB_URL } =
    process.env;

// const database = new Sequelize(
//     `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`,
//     { logging: false }
// );
const database = new Sequelize(DB_URL, { logging: false });

UserModel(database);
TaskModel(database);

const { Task, User } = database.models;

User.hasMany(Task, {
    foreignKey: "userId",
});
Task.belongsTo(User);

module.exports = { database, ...database.models };
