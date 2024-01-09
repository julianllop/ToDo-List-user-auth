import axios from "axios";
import {
    //TASKS
    CLEAR_STATE,
    GET_TASKS,
    GET_TASK,
    GET_BY_NAME,
    CREATE_TASK,
    ORDER_BY_NAME,
    ORDER_BY_DATE,
    UPDATE_TASK,
    DELETE_TASKS,
    DELETE_TASK,

    //USERS
    CREATE_USER,
    LOGIN,
    GET_USER_BY_TOKEN,
    LOGOUT,
} from "./actionTypes";

// GET ACTIONS

export const getTasks = (userId) => {
    return async (dispatch) => {
        try {
            const tasksFromDB = await axios.get(`/tasks?userId=${userId}`);
            const allTasks = tasksFromDB.data;
            return dispatch({ type: GET_TASKS, payload: allTasks });
        } catch (error) {
            console.log("Tasks not found (client): ", error);
        }
    };
};

export const getTask = (id) => {
    return async (dispatch) => {
        try {
            const taskById = await axios.get(`/tasks/${id}`);
            const task = taskById.data;
            return dispatch({
                type: GET_TASK,
                payload: task,
            });
        } catch (error) {
            console.log("Task not found (client): ", error);
        }
    };
};

export function getByName(title) {
    return async (dispatch) => {
        try {
            const task = await axios.get(`/tasks?title=${title}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: task.data,
            });
        } catch (error) {
            console.log("There is not a task with that title ", error);
        }
    };
}

export const clearState = () => {
    return { type: CLEAR_STATE };
};

// POST ACTIONS

export const createTask = (payload) => {
    return async (dispatch) => {
        try {
            const newTask = await axios.post(`/tasks`, payload);
            const createdTask = newTask.data;

            dispatch({
                type: CREATE_TASK,
                payload: createdTask,
            });
        } catch (error) {
            console.log("There was an error creating the task (client)", error);
        }
    };
};

// PUT ACTIONS

export const updateTask = (id, payload) => {
    return async (dispatch) => {
        try {
            if (!payload || typeof payload !== "object") {
                throw new Error("Invalid payload for updating task");
            }

            const updateData = await axios.put(`/tasks/${id}`, payload);
            const updatedTask = updateData.data;

            dispatch({
                type: UPDATE_TASK,
                payload: updatedTask,
            });
        } catch (error) {
            console.log("There was an error updating the task (client)", error);
            throw error;
        }
    };
};

// DELETE ACTIONS

export const deleteDataAndUpdateState = async (dispatch, endpoint, type) => {
    try {
        const deleteData = await axios.delete(endpoint);
        const deletedItem = deleteData.data;

        dispatch({
            type,
            payload: deletedItem,
        });
    } catch (error) {
        console.log(`There was an error: (${type})`, error);
    }
};

export const deleteTasks = () => {
    return async (dispatch) => {
        try {
            const deleteData = await axios.delete("/tasks");
            const deletedItems = deleteData.data;

            dispatch({
                type: DELETE_TASKS,
                payload: deletedItems,
            });
        } catch (error) {
            console.log("There was an error deleting tasks (client)", error);
        }
    };
};

export const deleteTask = (id) => {
    return async (dispatch) => {
        try {
            const deleteData = await axios.delete(`/tasks/${id}`);
            const deletedItem = deleteData.data;

            dispatch({
                type: DELETE_TASK,
                payload: deletedItem,
            });
        } catch (error) {
            console.log("There was an error deleting task (client)", error);
        }
    };
};

export const setEditing = (payload) => {
    return {
        type: "SET_EDITING",
        payload: payload,
    };
};

// ORDERS -------------------------------

export const orderByName = (payload) => {
    return {
        type: ORDER_BY_NAME,
        payload,
    };
};

export const orderByScore = (payload) => {
    return {
        type: ORDER_BY_DATE,
        payload,
    };
};

// USERS
export const createUser = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const newUser = await axios.post(`/user`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const createdUser = newUser.data;

            await axios.get(`/user/login/${createdUser.id}`, {
                withCredentials: true,
            });

            dispatch({
                type: CREATE_USER,
                payload: createdUser,
            });
        } catch (error) {
            console.log("There was an error creating the user (client)", error);
        }
    };
};

export const login = (payload) => {
    return async (dispatch) => {
        try {
            const data = JSON.stringify(payload);
            const user = await axios.post("/user/login", data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const loggedInUser = user.data;

            await axios.get(`/user/login/${loggedInUser.id}`, {
                withCredentials: true,
            });

            dispatch({
                type: LOGIN,
                payload: loggedInUser,
            });
        } catch (error) {
            console.log("There was an error trying to login (client)", error);
        }
    };
};

export const getUserByToken = (token) => {
    return async (dispatch) => {
        try {
            const config = {
                headers: {
                    Authorization: token,
                },
            };
            const userByToken = await axios.get("/user/token", config);
            const user = userByToken.data;

            dispatch({
                type: GET_USER_BY_TOKEN,
                payload: user,
            });
        } catch (error) {
            console.log("User not found (client): ", error);
        }
    };
};

export const logout = (payload) => {
    return async (dispatch) => {
        try {
            const loggedOut = await axios.get("/user/logout", {
                // Sending cookies from the client to the server
                withCredentials: true,
            });
            const loggedOutUser = loggedOut.data;

            dispatch({
                type: LOGOUT,
                payload: loggedOutUser,
            });
        } catch (error) {
            console.log("There was an error trying to logout (client)", error);
        }
    };
};
