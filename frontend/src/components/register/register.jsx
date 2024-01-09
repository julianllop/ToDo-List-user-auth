import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "./validateRegister";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
    Card,
    Typography,
    CardContent,
    TextField,
    Button,
    Box,
} from "@mui/material";
import style from "./register.module.css";
import { createUser } from "../../Redux/actions";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const firstInputRef = useRef(null);

    useEffect(() => {
        if (firstInputRef.current) {
            firstInputRef.current.focus();
        }
    }, []);

    const users = useSelector((state) => state.users);

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        passwordX2: "",
    });

    const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [property]: value });

        setErrors(
            validate({
                ...form,
                [property]: value,
            })
        );

        // console.log("errors: ", errors);
    };

    // const hasErrors = Object.values(errors).some((error) => error !== "");

    function handleSubmit(event) {
        event.preventDefault();

        let { username, email, password } = form;

        dispatch(createUser({ username, email, password }));

        console.log();
        setForm({
            username: "",
            email: "",
            password: "",
            passwordX2: "",
        });

        console.log(form);
        console.log("errors: ", errors);

        setTimeout(() => {
            navigate("/");
        }, 1000);
    }

    const isSmallScreen = useMediaQuery("(max-width:550px)");
    const isMediumScreen = useMediaQuery("(min-width:650px)");

    return (
        <div className={style.formContainer}>
            <Card
                sx={{
                    padding: "1rem",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "100%",
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
                    }}
                >
                    Sign Up
                </Typography>
                <CardContent>
                    <form className={style.form} onSubmit={handleSubmit}>
                        <div className={style.input}>
                            <TextField
                                required
                                variant="filled"
                                size={isSmallScreen ? "small" : "medium"}
                                label="username"
                                className={style.input}
                                onChange={handleInputChange}
                                name="username"
                                value={form.username}
                                inputRef={firstInputRef}
                                sx={{
                                    height: "30px",
                                    fontSize: "12px",
                                }}
                            />
                            {errors.username && (
                                <p className={style.error}>{errors.username}</p>
                            )}
                        </div>
                        <div className={style.input}>
                            <TextField
                                required
                                variant="filled"
                                size={isSmallScreen ? "small" : "medium"}
                                label="email"
                                className={style.input}
                                onChange={handleInputChange}
                                name="email"
                                value={form.email}
                                sx={{
                                    height: "30px",
                                    minWidth: "100%",
                                }}
                            />
                            {errors.email && (
                                <p className={style.error}>{errors.email}</p>
                            )}
                        </div>

                        <div className={style.input}>
                            <TextField
                                required
                                type="password"
                                variant="filled"
                                size={isSmallScreen ? "small" : "medium"}
                                label="password"
                                rows={4}
                                className={style.input}
                                onChange={handleInputChange}
                                name="password"
                                value={form.password}
                                sx={{
                                    height: "30px",
                                    minWidth: "100%",
                                }}
                            />
                            {errors.password && (
                                <p className={style.error}>{errors.password}</p>
                            )}
                        </div>
                        <div className={style.input}>
                            <TextField
                                required
                                type="password"
                                variant="filled"
                                size={isSmallScreen ? "small" : "medium"}
                                label="repeat password"
                                rows={4}
                                className={style.input}
                                onChange={handleInputChange}
                                name="passwordX2"
                                value={form.passwordX2}
                                sx={{
                                    height: "30px",
                                    fontSize: "12px",
                                }}
                            />
                            {errors.passwordX2 && (
                                <p className={style.error}>
                                    {errors.passwordX2}
                                </p>
                            )}
                        </div>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "20px",
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    margin: 0,
                                    padding: 0,

                                    ...(isMediumScreen && {
                                        fontSize: "13px",
                                    }),
                                }}
                            >
                                Already have an account?
                            </Typography>
                            <Link className={style.link} to={"/login"}>
                                Login
                            </Link>
                        </Box>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            // disabled={hasErrors}
                        >
                            Sign Up
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
