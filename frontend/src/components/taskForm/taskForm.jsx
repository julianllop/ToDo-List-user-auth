import React, { useEffect, useState, useRef } from "react";
import {
    Card,
    Typography,
    CardContent,
    TextField,
    Button,
} from "@mui/material";
import style from "./taskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { validate } from "./validations";
import {
    createTask,
    getTask,
    getUser,
    getUserByToken,
    updateTask,
} from "../../Redux/actions";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const TaskForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const tasks = useSelector((state) => state.allTasks);
    const user = useSelector((state) => state.userByToken);

    const [errors, setErrors] = useState({
        title: "",
        description: "",
    });

    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [editing, setEditing] = useState(false);
    // const [user, setUser] = useState({})

    const loadTask = async (id) => {
        try {
            const taskToEdit = await dispatch(getTask(id));

            if (taskToEdit && taskToEdit.payload) {
                const updatedTask = taskToEdit.payload;
                const { title, description } = updatedTask;

                // Ensure handling empty description
                setForm({
                    title: title || "",
                    description: description || "",
                });
                setEditing(true);
            } else {
                console.error("Task data is missing or undefined.");
            }
        } catch (error) {
            console.error("Error loading task:", error);
        }
    };

    const checkAuth = async () => {
        try {
            const cookie = document.cookie
                .split(";")
                .find((cookie) => cookie.trim().startsWith("jwt="));
            const jwtCookie = cookie.substring(4);
            const decodedUser = await dispatch(getUserByToken(jwtCookie));
            return decodedUser;
        } catch (error) {
            console.error("User not found:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (params.id) {
            loadTask(params.id);
        } else {
            setEditing(false);
            setForm({
                title: "",
                description: "",
            });
        }
    }, [params.id]);

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        setErrors(
            validate(
                {
                    ...form,
                    [property]: value,
                },
                tasks,
                editing
            )
        );

        // console.log("errors: ", errors);
    };

    const hasErrors = Object.values(errors).some((error) => error !== "");

    function handleSubmit() {
        let { title, description } = form;

        const taskData = {
            title,
            description,
            id: user.id,
        };

        editing
            ? dispatch(updateTask(params.id, taskData))
            : dispatch(createTask(taskData));

        setForm({
            title: "",
            description: "",
        });

        console.log(form);
        console.log("errors: ", errors);

        setEditing(false);
        navigate("/");
    }

    const isSmallScreen = useMediaQuery("(min-width:280px)");
    const isMediumScreen = useMediaQuery("(min-width:400px)");
    const isLargeScreen = useMediaQuery("(min-width:600px)");

    return (
        <div className={style.formContainer}>
            <Card
                sx={{
                    padding: "4rem",
                    backgroundColor: "",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",

                    ...(isSmallScreen && {
                        padding: "1rem",
                        minWidth: "90%",
                    }),

                    ...(isMediumScreen && {
                        padding: "2rem",
                        minWidth: "60%",
                    }),
                    ...(isLargeScreen && {
                        padding: "4rem",
                        minWidth: "40%",
                    }),
                }}
            >
                <Typography
                    sx={{
                        fontSize: "25px",
                        fontWeight: "700",
                        background:
                            "linear-gradient(90deg, rgba(140,214,255,1) 0%, rgb(25,118,210) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",

                        ...(isSmallScreen && {
                            fontSize: "20px",
                        }),
                        ...(isLargeScreen && {
                            fontSize: "25px",
                        }),
                    }}
                >
                    {!editing ? "CREATE TASK" : "UPDATE TASK"}
                </Typography>
                <CardContent>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.input}>
                            <TextField
                                required
                                variant="filled"
                                label="Title"
                                className={style.input}
                                onChange={handleInputChange}
                                name="title"
                                value={form.title}
                                inputRef={firstInputRef}
                                sx={{
                                    minWidth: "100%",
                                }}
                            />
                            {errors.title && <p className={style.error}>{errors.title}</p>}
                        </div>

                        <div className={style.input}>
                            <TextField
                                variant="filled"
                                label="Description"
                                multiline
                                rows={4}
                                className={style.input}
                                onChange={handleInputChange}
                                name="description"
                                value={form.description}
                                sx={{
                                    minWidth: "100%",
                                }}
                            />
                            {errors.description && <p className={style.error}>{errors.description}</p>}
                        </div>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            disabled={hasErrors}
                        >
                            {!editing ? "CREATE" : "UPDATE"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskForm;
