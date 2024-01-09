import React from "react";
import style from "./task.module.css";

const Task = ({ title, id }) => {
    return <h3 className={style.title}>{title}</h3>;
};

export default Task;
