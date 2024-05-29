import React from "react";
import Task from "./taskComponent/Task.js";
import './TasksList.css'

function TasksList(props) {

    const userId = localStorage.getItem('userId')

    function filterTasks(event) {
        props.setTasksFilter(event.target.value);
    }

    return (
        <div>
            <select id="categoryFilter" className="categoryFilter" onChange={filterTasks}>
                    <option value="All" selected>All</option>
                    <option value="To Do">To Do</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
            </select>

            <p className="tasksTitle">FAVORITE TASKS</p>
            {props.tasks.favorite.length > 0 ? (
                props.tasks.favorite.map((task, index) => (
                    <Task task={task} getTasks={() => props.getTasks(userId)} />
                ))
            ) : (
                <p className="noTasks">No favorite tasks</p>
            )}

            <p className="tasksTitle">UNCOMPLETED TASKS</p>
            {props.tasks.uncompleted.length > 0 ? (
                props.tasks.uncompleted.map((task, index) => (
                    <Task task={task} getTasks={() => props.getTasks(userId)} />
                ))
            ) : (
                <p className="noTasks">No uncompleted tasks</p>
            )}
            
            <p className="tasksTitle">COMPLETED TASKS</p>
            {props.tasks.completed.length > 0 ? (
                props.tasks.completed.map((task, index) => (
                    <Task task={task} getTasks={() => props.getTasks(userId)} />
                ))
            ) : (
                <p className="noTasks">No completed tasks</p>
            )}
        </div>
    ) 
}

export default TasksList;