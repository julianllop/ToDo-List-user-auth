import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import style from "./navBar.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/actions";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const jwtCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));

                if (!jwtCookie) {
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Auth error:", error);
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        dispatch(logout());
    };

    const isSmallScreen = useMediaQuery("(max-width:290px)");
    const isMediumScreen = useMediaQuery("(min-width:650px)");

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                display: "flex",
                backgroundColor: "#eaeaea",
                padding: "0",
            }}
        >
            <AppBar
                sx={{
                    display: "flex",
                    backgroundColor: "#eaeaea",
                    padding: "0",
                    minWidth: "100%",
                }}
            >
                <Toolbar
                    sx={{
                        display: "flex",
                        backgroundColor: "#eaeaea",
                        padding: "0",
                        // maxWidth: "90%",
                    }}
                    className={style.navBar}
                >
                    <Typography
                        color={"black"}
                        sx={{
                            ...(isSmallScreen && {
                                fontSize: "small",
                            }),
                        }}
                    >
                        <Link to="/" className={style.link}>
                            TASK LIST
                        </Link>
                    </Typography>

                    {isLoggedIn ? (
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleLogout();
                                navigate("/login");
                            }}
                            size={isSmallScreen ? "small" : "medium"}
                        >
                            Logout
                        </Button>
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/register");
                                }}
                                size={isSmallScreen ? "small" : "medium"}
                            >
                                Sign up
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate("/login");
                                }}
                                size={isSmallScreen ? "small" : "medium"}
                            >
                                Login
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;
