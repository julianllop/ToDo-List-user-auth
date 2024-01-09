import React, { useEffect, useState } from "react";
import style from "./taskList.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { deleteTask, getTasks, getUserByToken } from "../../Redux/actions";
import TaskDetail from "../editModal/taskDetail";
import useMediaQuery from "@mui/material/useMediaQuery";

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.userByToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [deletingTask, setDeletingTask] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            try {
                const cookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));
                const jwtCookie = cookie.substring(4);
                dispatch(getUserByToken(jwtCookie));
            } catch (error) {
                console.error("User not found:", error);
            }
        };

        checkAuth();
    }, [dispatch]);

    useEffect(() => {
        if (user && !deletingTask) {
            dispatch(getTasks(user.id))
                .then(() => setLoading(false))
                .catch((error) => {
                    console.error("Error fetching tasks:", error);
                    setLoading(false);
                });
        }
    }, [user, dispatch, deletingTask]);

    const handleDelete = async (id) => {
        setDeletingTask(true);
        dispatch(deleteTask(id))
            .then(() => setDeletingTask(false))
            .catch((error) => {
                console.error("Error deleting task:", error);
                setDeletingTask(false);
            });
    };

    const [loading, setLoading] = useState(true);

    const isSmallScreen = useMediaQuery("(max-width:400px)");
    const isMediumScreen = useMediaQuery("(max-width:550px)");
    const isBigScreen = useMediaQuery("(min-width:550px)");

    const islargeScreen = useMediaQuery("(min-width:550px)");

    const isBiggerScreen = useMediaQuery("(min-width:1000px)");

    return (
        <Box
            sx={{
                minWidth: "100%",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: "30px",
                marginTop: "112px",

                ...(islargeScreen && {
                    marginTop: "128px",
                }),
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "100%",
                    gap: "8px",
                    marginTop: "50px",

                    // ...(isMediumScreen && { marginTop: "80px" }),

                    ...(isBigScreen && { marginTop: "50px" }),
                }}
            >
                <Typography
                    sx={{
                        color: "black",
                        fontWeight: 500,
                        fontSize: "2rem",

                        ...(isSmallScreen && {
                            fontSize: "1.5rem",
                        }),

                        ...(isBigScreen && {
                            fontSize: "2rem",
                        }),

                        ...(isBiggerScreen && {
                            fontSize: "3rem",
                        }),
                    }}
                >
                    Welcome,
                </Typography>
                <Typography
                    sx={{
                        background:
                            "linear-gradient(90deg, rgba(140,214,255,1) 0%, rgb(25,118,210) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 700,
                        fontSize: "2rem",

                        ...(isSmallScreen && {
                            fontSize: "1.5rem",
                        }),

                        ...(isBigScreen && {
                            fontSize: "2rem",
                        }),
                        ...(isBiggerScreen && {
                            fontSize: "3rem",
                        }),
                    }}
                >
                    {user.username}
                </Typography>{" "}
            </Box>
            <div className={style.outerContainer}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        minWidth: "100%",
                    }}
                >
                    <div
                        className={style.addButton}
                        onClick={() => {
                            navigate("/new-task");
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#188038",
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                "&:hover": {
                                    cursor: "pointer",
                                },

                                ...(isSmallScreen && {
                                    fontSize: "12px",
                                }),

                                ...(isBiggerScreen && {
                                    fontSize: "25px",
                                }),
                            }}
                        >
                            ADD
                        </Typography>
                        <Button
                            sx={{
                                minWidth: 20,
                                backgroundColor: "#188038",
                                color: "white",
                                borderRadius: "10px",
                                "&:hover": {
                                    color: "#188038",
                                    backgroundColor: "rgb(240, 240, 240)",
                                },
                                border: "2px solid #188038",

                                ...(isSmallScreen && {
                                    padding: "2px 2px 2px 2px",
                                    borderRadius: "5px",
                                }),
                            }}
                            onClick={() => {
                                navigate("/new-task");
                            }}
                        >
                            <AddIcon
                                sx={{
                                    ...(isSmallScreen && {
                                        fontSize: "1rem",
                                    }),

                                    ...(isBiggerScreen && {
                                        fontSize: "2rem",
                                    }),
                                }}
                            />
                        </Button>
                    </div>
                </Box>
                <div className={style.taskContainer}>
                    {!tasks.length && (
                        <Typography
                            sx={{
                                color: "#848484",
                                fontWeight: 500,
                                fontSize: "1.2rem",
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            You have no tasks right now...
                        </Typography>
                    )}

                    {loading ? (
                        <h1>Loading</h1>
                    ) : (
                        tasks?.map((task, index) => (
                            <div key={task.id} className={style.container}>
                                <h2>{index + 1}</h2>
                                <TaskDetail
                                    title={task.title}
                                    description={task.description}
                                />
                                <div className={style.buttons}>
                                    <Button
                                        sx={{
                                            minWidth: 20,
                                            backgroundColor: "#1976D2",
                                            color: "white",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                color: "#1976D2",
                                            },
                                            border: "1px solid #1976D2",

                                            ...(isSmallScreen && {
                                                padding: "2px 0 2px 0",
                                                borderRadius: "5px",
                                            }),

                                            ...(isMediumScreen && {
                                                padding: "3px 12px 3px 12px",
                                                borderRadius: "5px",
                                            }),

                                            ...(isBigScreen && {
                                                padding: "5px 15px 5px 15px",
                                                borderRadius: "8px",
                                            }),

                                            ...(isBiggerScreen && {
                                                padding: "10px 25px 10px 25px",
                                                borderRadius: "8px",
                                            }),
                                        }}
                                        onClick={() =>
                                            navigate(`/task/${task.id}/edit`)
                                        }
                                    >
                                        <EditIcon
                                            sx={{
                                                ...(isSmallScreen && {
                                                    fontSize: "17px",
                                                }),

                                                ...(isMediumScreen && {
                                                    fontSize: "20px",
                                                }),

                                                ...(isBigScreen && {
                                                    fontSize: "25px",
                                                }),

                                                ...(isBiggerScreen && {
                                                    fontSize: "30px",
                                                }),
                                            }}
                                        />
                                    </Button>
                                    <Button
                                        sx={{
                                            minWidth: 20,
                                            backgroundColor: "#e0331c",
                                            color: "white",
                                            borderRadius: "10px",
                                            "&:hover": {
                                                color: "#e0331c",
                                            },
                                            border: "1px solid #e0331c",

                                            ...(isSmallScreen && {
                                                padding: "2px 0 2px 0",
                                                borderRadius: "5px",
                                            }),

                                            ...(isMediumScreen && {
                                                padding: "3px 12px 3px 12px",
                                                borderRadius: "5px",
                                            }),
                                            ...(isBigScreen && {
                                                padding: "5px 15px 5px 15px",
                                                borderRadius: "8px",
                                            }),

                                            ...(isBiggerScreen && {
                                                padding: "10px 25px 10px 25px",
                                                borderRadius: "8px",
                                            }),
                                        }}
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <DeleteIcon
                                            sx={{
                                                ...(isSmallScreen && {
                                                    fontSize: "17px",
                                                }),

                                                ...(isMediumScreen && {
                                                    fontSize: "20px",
                                                }),

                                                ...(isBiggerScreen && {
                                                    fontSize: "30px",
                                                }),
                                            }}
                                        />
                                    </Button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Box>
    );
};

export default TaskList;
