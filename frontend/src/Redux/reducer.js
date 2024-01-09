import {
    //TASK
    CLEAR_STATE,
    GET_TASKS,
    GET_TASK,
    GET_BY_NAME,
    CREATE_TASK,
    ORDER_BY_NAME,
    // ORDER_BY_DATE,
    UPDATE_TASK,
    DELETE_TASKS,
    DELETE_TASK,
    TASK_DETAIL,
    EDITING,

    //USER
    CREATE_USER,
    LOGIN,
    GET_USER,
    GET_USER_BY_TOKEN,
    LOGOUT,
} from "./actionTypes";

const initialState = {
    tasks: [],
    allTasks: [], //copy
    taskById: {},
    newTask: {},
    editing: false,

    users: [],
    userByToken: {},
    allUsers: [], //copy
    user: {},
    newUser: {},
    loggedInUser: {},
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                newTask: action.payload,
            };

        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                allTasks: action.payload,
            };

        case GET_TASK:
            return {
                ...state,
                taskById: action.payload,
            };

        case CLEAR_STATE:
            return {
                ...state,
                taskById: [],
            };

        case GET_BY_NAME:
            return {
                ...state,
                recipes: action.payload,
            };

        case TASK_DETAIL:
            return {
                ...state,
                taskById: action.payload,
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload),
                allTasks: state.allTasks.filter(
                    (task) => task.id !== action.payload
                ),
            };
        case DELETE_TASKS:
            return {
                ...state,
                tasks: [],
                allTasks: [],
            };
        case UPDATE_TASK:
            const updatedTask = action.payload;
            const updatedTasks = state.tasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            );
            return {
                ...state,
                tasks: updatedTasks,
            };

        //ordenados---------------------------------------------------------------
        case ORDER_BY_NAME:
            const sortedByName =
                action.payload === "asc_name"
                    ? state.recipes.sort((a, b) => {
                          if (a.title > b.title) {
                              return 1;
                          }
                          if (b.title > a.title) {
                              return -1;
                          }
                          return 0;
                      })
                    : action.payload === "desc_name"
                    ? state.recipes.sort((a, b) => {
                          if (a.title > b.title) {
                              return -1;
                          }
                          if (b.title > a.title) {
                              return 1;
                          }
                          return 0;
                      })
                    : state.recipes;
            console.log(sortedByName);
            return {
                ...state,
                recipes: sortedByName,
            };

        case EDITING:
            return {
                ...state,
                editing: action.payload,
            };

        case GET_USER:
            return {
                ...state,
                user: action.payload,
            };

        case GET_USER_BY_TOKEN:
            return {
                ...state,
                userByToken: action.payload,
            };

        case CREATE_USER:
            return {
                ...state,
                newUser: action.payload,
            };

        case LOGIN:
            return {
                ...state,
                loggedInUser: action.payload,
            };

        case LOGOUT:
            return {
                ...state,
                loggedInUser: action.payload,
            };

        // case ORDER_BY_DATE:
        //     const sortedByScore =
        //         action.payload === "asc_score"
        //             ? state.recipes.sort(function (a, b) {
        //                   return (
        //                       parseInt(a.healthScore, 10) -
        //                       parseInt(b.healthScore, 10)
        //                   );
        //               })
        //             : action.payload === "desc_score"
        //             ? state.recipes.sort(function (a, b) {
        //                   return (
        //                       parseInt(b.healthScore, 10) -
        //                       parseInt(a.healthScore, 10)
        //                   );
        //               })
        //             : state.recipes;

        default:
            return { ...state };
    }
};

export default rootReducer;
