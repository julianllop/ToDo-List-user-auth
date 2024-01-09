import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TaskList from "../components/taskList/taskList";
import { getTasks, getUser } from "../Redux/actions";

const Home = () => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     dispatch(getTasks())
    //         .then(() => setLoading(false))
    //         .catch((error) => {
    //             console.error("Error fetching recipes:", error);
    //             setLoading(false);
    //         });
    // }, [dispatch]);

    return (
        <div>
            <TaskList />
        </div>
    );
};

export default Home;
