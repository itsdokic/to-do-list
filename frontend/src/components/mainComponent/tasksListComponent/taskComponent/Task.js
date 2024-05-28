import './Task.css';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function Task(props) {

    async function completeTask(taskId) {
        await axios.post("http://localhost:5000/completeTask", {
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

        props.getTasks();
   }

    async function removeTask(taskId) {
        await axios.delete(`http://localhost:5000/removeTask/${taskId}`)
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
            <IconButton onClick={() => removeTask(props.task._id)}>
                <DeleteIcon /> 
            </IconButton>
        </div>
    )
}

export default Task;