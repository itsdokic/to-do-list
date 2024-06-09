import React from "react";

import { Delete, Star, StarOutline } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

import EditTask from "./EditTask/EditTask";

import "./Task.css";

function Task(props) {
    
    async function completeTask(taskId) {
        if (!props.task.completed) {
            await axios
                .post("http://localhost:5000/completeTask", {
                    id: taskId,
                })
                .then(
                    (response) => {
                        console.log("Uspješno");
                    },
                    (error) => {
                        console.log("Error", error);
                    }
                );
        } else {
            await axios
                .post("http://localhost:5000/uncompleteTask", {
                    id: taskId,
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

        props.getTasks();
    }

    async function favorTask(taskId) {
        if (!props.task.favorite) {
            await axios
                .post("http://localhost:5000/favorTask", {
                    id: taskId,
                })
                .then(
                    (response) => {
                        console.log("Uspješno");
                    },
                    (error) => {
                        console.log("Error", error);
                    }
                );
        } else {
            await axios
                .post("http://localhost:5000/unfavorTask", {
                    id: taskId,
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

        props.getTasks();
    }

    async function removeTask(taskId) {
        await axios.delete(`http://localhost:5000/removeTask/${taskId}`).then(
            (response) => {
                console.log("Uspješno");
            },
            (error) => {
                console.log("Error", error);
            }
        );

        props.getTasks();
    }

    return (
        <div className="taskItem">
            <p
                onClick={() => completeTask(props.task._id)}
                className={
                    props.task.completed ? "completedTask" : "uncompletedTask"
                }
                id={props.task._id}
            >
                {props.task.task}
            </p>
            <div className="buttons">
                <EditTask
                    task={props.task.task}
                    taskId={props.task._id}
                    getTasks={() => props.getTasks()}
                />
                <IconButton onClick={() => favorTask(props.task._id)}>
                    {props.task.favorite ? <Star /> : <StarOutline />}
                </IconButton>
                <IconButton onClick={() => removeTask(props.task._id)}>
                    <Delete />
                </IconButton>
            </div>
        </div>
    );
}

export default Task;
