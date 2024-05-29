import './Main.css';
import React from 'react';
import TaskInput from './taskInputComponent/TaskInput';
import TasksList from './tasksListComponent/TasksList';
import axios from "axios";

function Main() {

    function generateUserId() {
        return Math.floor(Math.random() * Math.pow(10, 6));
    }

    const [tasks, setTasks] = React.useState({ favorite: [], uncompleted: [], completed: [] });
    const [tasksFilter, setTasksFilter] = React.useState("All");

    React.useEffect(() => {
        var userId = localStorage.getItem('userId');
        if (userId) {
            getTasks(userId)
        }
        else {
            userId = generateUserId();
            localStorage.setItem('userId', userId)
        }

    }, []);

    React.useEffect(() => {
        var userId = localStorage.getItem('userId');
        getTasks(userId)
    }, [tasksFilter]);
    
    async function getTasks(userId) {
        if (tasksFilter === "All") {
            await axios.get(`https://to-do-list-46n0.onrender.com/getTasks/${userId}`)
            .then(
                (response) => {
                    setTasks(response.data)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
        else {
            await axios.get("https://to-do-list-46n0.onrender.com/getFilteredTasks", {
                params: {
                    userId: userId,
                    category: tasksFilter
                }
            })
            .then(
                (response) => {
                    setTasks(response.data)
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    return (
        <main>
            <TaskInput getTasks={(userId) => getTasks(userId)} />
            <TasksList tasks={tasks} tasksFilter={tasksFilter} setTasksFilter={setTasksFilter} getTasks={(userId) => getTasks(userId)} />
        </main>
    )
}

export default Main;