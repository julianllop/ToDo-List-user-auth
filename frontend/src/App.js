import "./App.css";
import { Routes, Route } from "react-router-dom";
import TaskForm from "./components/taskForm/taskForm";
import NavBar from "./components/navBar/navBar";
import axios from "axios";
import Home from "./views/home";

import Login from "./components/login/login";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Register from "./components/register/register";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const jwtCookie = document.cookie
                    .split(";")
                    .find((cookie) => cookie.trim().startsWith("jwt="));

                if (
                    !jwtCookie &&
                    location.pathname !== "/login" &&
                    location.pathname !== "/register"
                ) {
                    navigate("/login");
                }
            } catch (error) {
                console.error("Auth error:", error);
            }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    return (
        <div className="App">
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-task" element={<TaskForm />} />
                <Route path="/task/:id/edit" element={<TaskForm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
