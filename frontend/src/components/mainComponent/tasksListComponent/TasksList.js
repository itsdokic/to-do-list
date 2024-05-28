import React from "react";
import Task from "./taskComponent/Task.js";

function TasksList(props) {

    const userId = localStorage.getItem('userId')
    
    return (
        <div>
            {props.tasks.map((task, index) => (
                <Task task={task} index={index} getTasks={() => props.getTasks(userId)} />
            ))}
        </div>
    )
}

export default TasksList;