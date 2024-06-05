import React from "react";

import axios from "axios";

import TaskInput from "./TaskInput/TaskInput";
import TasksList from "./TasksList/TasksList";

import "./Main.css";

function Main() {
    function generateUserId() {
        return Math.floor(Math.random() * Math.pow(10, 6));
    }

    const [tasks, setTasks] = React.useState({
        favorite: [],
        uncompleted: [],
        completed: [],
    });
    const [tasksFilter, setTasksFilter] = React.useState("All");

    React.useEffect(() => {
        var userId = localStorage.getItem("userId");
        if (userId) {
            getTasks(userId);
        } else {
            userId = generateUserId();
            localStorage.setItem("userId", userId);
        }
    }, []);

    React.useEffect(() => {
        var userId = localStorage.getItem("userId");
        getTasks(userId);
    }, [tasksFilter]);

    async function getTasks(userId) {
        if (tasksFilter === "All") {
            await axios.get(`http://localhost:5000/getTasks/${userId}`).then(
                (response) => {
                    setTasks(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            await axios
                .get("http://localhost:5000/getFilteredTasks", {
                    params: {
                        userId: userId,
                        category: tasksFilter,
                    },
                })
                .then(
                    (response) => {
                        setTasks(response.data);
                    },
                    (error) => {
                        console.log(error);
                    }
                );
        }
    }

    return (
        <main>
            <TaskInput getTasks={(userId) => getTasks(userId)} />
            <TasksList
                tasks={tasks}
                tasksFilter={tasksFilter}
                setTasksFilter={setTasksFilter}
                getTasks={(userId) => getTasks(userId)}
            />
        </main>
    );
}

export default Main;
