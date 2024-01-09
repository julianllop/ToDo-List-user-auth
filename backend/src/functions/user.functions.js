require("dotenv").config();
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.ACCESS_TOKEN_SECRET;

const getUsersFromDB = async () => {
    const users = await User.findAll();
    return users;
};

const getUserFromDB = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }

    const auth = await bcrypt.compare(password, user.password);

    if (!auth) return null;

    return user;
};

const createUserInDB = async (username, email, password) => {
    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);
    const newUser = await User.create({ username, email, password });

    return newUser;
};

const updateUserInDB = async (id, newUsername, newEmail, newPassword) => {
    const updatedUser = await User.findByPk(id);

    if (!updatedUser) throw Error("User not found!");

    updatedUser.username = newUsername;
    updatedUser.email = newEmail;
    updatedUser.password = newPassword;

    await updatedUser.save();

    return updatedUser;
};

const createToken = (id) => {
    const token = jwt.sign({ id }, secret, { expiresIn: "24h" });
    return token;
};

const verifyToken = async (token) => {
    const decodedUser = jwt.verify(token, secret, async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
        } else {
            const user = await User.findByPk(decodedToken.id);
            const userData = {
                id: user.id,
                username: user.username,
                email: user.email,
            };

            return userData;
        }
    });
    return decodedUser
};

const deleteUserInDB = async (id) => {
    const user = await User.findByPk(id);

    if (!user) {
        throw new Error("User not found");
    }

    await user.destroy();
};

module.exports = {
    getUsersFromDB,
    getUserFromDB,
    createUserInDB,
    updateUserInDB,
    deleteUserInDB,
    createToken,
    verifyToken,
};
