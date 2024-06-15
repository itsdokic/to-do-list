import React from "react";

import axios from "axios";

import CustomSnackbar from "../../common/CustomSnackbar/CustomSnackbar.js";
import Task from "./Task/Task.js";

import "./TasksList.css";

function TasksList(props) {
    const userId = localStorage.getItem("userId");
    const [responseMessage, setResponseMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("");

    function filterTasks(event) {
        props.setTasksFilter(event.target.value);
    }

    async function recurTask(task) {
        await axios
            .post("http://localhost:5000/tasks/recurTask", {
                id: task._id,
            })
            .then(
                (response) => {
                    console.log("Uspješno");
                },
                (error) => {
                    console.log("Error", error);
                }
            );
    }

    function checkRecurring(task) {
        const currentTime = new Date();
        const lastRecurred = new Date(task.lastRecurred);
        const timeDiff = currentTime.getTime() - lastRecurred.getTime();

        let shouldRecur = false;

        if (task.recurring === "Hourly") {
            const hoursPassed = timeDiff / (1000 * 3600);
            shouldRecur = hoursPassed >= 1;
        } else if (task.recurring === "Daily") {
            const daysPassed = timeDiff / (1000 * 3600 * 24);
            shouldRecur = daysPassed >= 1;
        } else if (task.recurring === "Weekly") {
            const weeksPassed = timeDiff / (1000 * 3600 * 24 * 7);
            shouldRecur = weeksPassed >= 1;
        } else if (task.recurring === "Monthly") {
            const monthsPassed =
                (currentTime.getFullYear() - lastRecurred.getFullYear()) * 12 +
                (currentTime.getMonth() - lastRecurred.getMonth());
            shouldRecur = monthsPassed >= 1;
        }

        if (shouldRecur) {
            recurTask(task);
        }
    }

    return (
        <div>
            <select
                id="categoryFilter"
                className="categoryFilter"
                onChange={filterTasks}
            >
                <option value="All" selected>
                    All
                </option>
                <option value="To Do">To Do</option>
                <option value="Shopping">Shopping</option>
                <option value="Work">Work</option>
                <option value="School">School</option>
                {props.categories.map((category) => (
                    <option value={category}>{category.category}</option>
                ))}
            </select>

            <p className="tasksTitle">FAVORITE TASKS</p>
            {props.tasks.favorite.length > 0 ? (
                props.tasks.favorite.map((task, index) => (
                    <Task
                        task={task}
                        getTasks={() => props.getTasks(userId)}
                        setResponseMessage={setResponseMessage}
                        setSnackbarSeverity={setSnackbarSeverity}
                    />
                ))
            ) : (
                <p className="noTasks">No favorite tasks</p>
            )}

            <p className="tasksTitle">UNCOMPLETED TASKS</p>
            {props.tasks.uncompleted.length > 0 ? (
                props.tasks.uncompleted.map((task, index) => (
                    <Task
                        task={task}
                        getTasks={() => props.getTasks(userId)}
                        setResponseMessage={setResponseMessage}
                        setSnackbarSeverity={setSnackbarSeverity}
                    />
                ))
            ) : (
                <p className="noTasks">No uncompleted tasks</p>
            )}

            <p className="tasksTitle">COMPLETED TASKS</p>
            {props.tasks.completed.length > 0 ? (
                props.tasks.completed.map(
                    (task, index) => (
                        checkRecurring(task),
                        (
                            <Task
                                task={task}
                                getTasks={() => props.getTasks(userId)}
                                setResponseMessage={setResponseMessage}
                                setSnackbarSeverity={setSnackbarSeverity}
                            />
                        )
                    )
                )
            ) : (
                <p className="noTasks">No completed tasks</p>
            )}

            {responseMessage !== "" ? (
                <CustomSnackbar
                    message={responseMessage}
                    severity={snackbarSeverity}
                    setResponseMessage={setResponseMessage}
                />
            ) : null}
        </div>
    );
}

export default TasksList;
