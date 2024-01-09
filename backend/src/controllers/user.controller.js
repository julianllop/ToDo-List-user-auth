const {
    getUsersFromDB,
    createUserInDB,
    updateUserInDB,
    deleteUserInDB,
    createToken,
    getUserFromDB,
    verifyToken,
} = require("../functions/user.functions");

const getUsers = async (req, res) => {
    try {
        const users = await getUsersFromDB();
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({
            message: "Error getting all users",
            error: error.message,
        });
    }
};

const getUser = async (req, res) => {
    const token = req.headers.authorization;

    try {
        const user = await verifyToken(token);
        if (!user) {
            res.status(404).json({
                message: "User not found (server)",
            });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({
            message: "User not found (server)",
            error: error.message,
        });
    }
};

const createUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = await createUserInDB(username, email, password);

        res.status(201).json({ id: newUser.id });
    } catch (error) {
        res.status(400).json({
            message: "Error at creating new User",
            error: error.message,
        });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const updatedUser = await updateUserInDB(id, username, email, password);
        res.status(201).json(updatedUser);
    } catch (error) {
        res.status(400).json({
            message: "Error at updating User",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const loggedInUser = await getUserFromDB(email, password);

        res.status(201).json({ id: loggedInUser.id });
    } catch (error) {
        res.status(400).json({
            message: "Error at logging in User",
            error: error.message,
        });
    }
};

const setCookie = (req, res) => {
    const { id } = req.params;

    const token = createToken(id);
    res.cookie("jwt", token, {
        maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(201).send("User logged in");
};

const logout = async (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1,
    });
    res.status(201).send("User logged out");
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await deleteUserInDB(id);
        res.status(201).json(deletedUser);
    } catch (error) {
        res.status(400).json({
            message: "Error at deleting User",
            error: error.message,
        });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    login,
    logout,
    setCookie,
};
