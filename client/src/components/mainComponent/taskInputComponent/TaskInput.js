import React from 'react';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import './TaskInput.css';

function TaskInput(props) {
      
      const userId = localStorage.getItem('userId')

      async function addTask(event) {
        let validationMessage = event.target.closest('.taskInput').querySelector('#validationMessage')
        const input = event.target.closest('.formFrame').querySelector('#formInput');
        const newTaskName = input.value.trim();
        const newTaskCategory = event.target.closest('.formFrame').querySelector('#category').value;
        console.log(newTaskCategory)
    
        if (newTaskName !== "" && newTaskCategory !== "") {

          await axios.post("https://to-do-list-46n0.onrender.com/addtask", {
            user_id: userId,  
            task: newTaskName,
            category: newTaskCategory
          })
          .then(
            (response) => {
              console.log("Uspješno")
            },
            (error) => {
              console.log("Error", error)
            }
          );
    
          input.value = "";
          validationMessage.textContent = "‎"

          props.getTasks(userId);
        }
        else if (newTaskName === "" && newTaskCategory !== "") {
          validationMessage.textContent = "Enter a task!"
        }
        else if (newTaskCategory === "" && newTaskName !== "") {
          validationMessage.textContent = "Select a category!"
        }
        else {
          validationMessage.textContent = "Enter a task and select a category!"
        }
    
      }
      
    
      return (
        <div className="taskInput">
          <FormControl className="formFrame" variant="outlined">
            <OutlinedInput
              id="formInput"
              type="text"
              placeholder="Enter a title for a task..."
              endAdornment = {
                <InputAdornment position="end">
                  <select id="category" className="category">
                    <option className="disabled" value="" selected disabled>Category</option>
                    <option value="To Do">To Do</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
                  </select>
                  <IconButton onClick={addTask} edge="end">
                    <AddCircleIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <p id="validationMessage">‎</p>
          <hr className="dividerLine"></hr>
        </div>
      );
}

export default TaskInput;