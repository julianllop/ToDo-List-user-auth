const { Router } = require("express");
const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    setCookie,
} = require("../controllers/user.controller");

// const { requireAuth } = require("../middleware/authMiddleware");

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/token", getUser);

userRouter.get("/login/:id", setCookie);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.post("/login", login);

userRouter.get("/cookie", setCookie);

userRouter.get("/logout", logout);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;
