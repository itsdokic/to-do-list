import './Task.css';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import EditTask from './editTaskComponent/EditTask';

function Task(props) {

    async function completeTask(taskId) {
        if (!props.task.completed) {
            await axios.post("https://to-do-list-46n0.onrender.com/completeTask", {
                id: taskId
            })
            .then(
                (response) => {
                  console.log("Uspješno")
                },
                (error) => {
                  console.log("Error", error)
                }
            );
        }
        else {
            await axios.post("https://to-do-list-46n0.onrender.com/uncompleteTask", {
                id: taskId
            })
            .then(
                (response) => {
                console.log("Uspješno")
                },
                (error) => {
                console.log("Error", error)
                }
            );
        }

        props.getTasks();
   }

   async function favorTask(taskId) {
        if (!props.task.favorite) {
            await axios.post("https://to-do-list-46n0.onrender.com/favorTask", {
                id: taskId
            })
            .then(
                (response) => {
                console.log("Uspješno")
                },
                (error) => {
                console.log("Error", error)
                }
            );
        }
        else {
            await axios.post("https://to-do-list-46n0.onrender.com/unfavorTask", {
                id: taskId
            })
            .then(
                (response) => {
                console.log("Uspješno")
                },
                (error) => {
                console.log("Error", error)
                }
            );
        }

        props.getTasks();
   }

    async function removeTask(taskId) {
        await axios.delete(`https://to-do-list-46n0.onrender.com/removeTask/${taskId}`)
        .then(
            (response) => {
            console.log("Uspješno")
            },
            (error) => {
            console.log("Error", error)
            }
        );

        props.getTasks();
    }

    return (
        <div className="taskItem">
            <p  onClick={() => completeTask(props.task._id)} 
                className={props.task.completed ? "completedTask" : "uncompletedTask"}  
                id = {props.task._id}> {props.task.task} </p>
            <div className="buttons">
                <EditTask task={props.task.task} taskId={props.task._id} getTasks={() => props.getTasks()} /> 
                <IconButton onClick={() => favorTask(props.task._id)}>
                    {props.task.favorite ? <StarIcon /> : <StarOutlineIcon /> }
                </IconButton>
                <IconButton onClick={() => removeTask(props.task._id)}>
                    <DeleteIcon /> 
                </IconButton>
            </div>
        </div>
    )
}

export default Task;