import './Main.css';
import React from 'react';
import TaskInput from './taskInputComponent/TaskInput';
import TasksList from './tasksListComponent/TasksList';
import axios from "axios";

function Main() {

    function generateUserId() {
        return Math.floor(Math.random() * Math.pow(10, 6));
    }

    const [tasks, setTasks] = React.useState([]);

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
    
    async function getTasks(userId) {
        await axios.get(`http://localhost:5000/getTasks/${userId}`)
        .then(
            (response) => {
                setTasks(response.data)
            },
            (error) => {
                console.log(error)
            }
        )
    }

    return (
        <main>
            <TaskInput getTasks={(userId) => getTasks(userId)} />
            <TasksList tasks={tasks} getTasks={(userId) => getTasks(userId)} />
        </main>
    )
}

export default Main;