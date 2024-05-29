import React from 'react';
import Popover from '@mui/material/Popover';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';
import './EditTask.css';

function EdiTask(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    function openEditTask(event) {
        setAnchorEl(event.currentTarget);
    }

    function closeEditTask(event) {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);

    async function editTask(event) {
        const input = event.target.closest('.editFormFrame').querySelector('#editFormInput');
        const editedTaskName = input.value.trim();

        if (editedTaskName !== "" && editedTaskName !== props.task) {
            await axios.post("https://to-do-list-46n0.onrender.com/editTask", {
            taskId: props.taskId,  
            task: editedTaskName,
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

        setAnchorEl(null);
        props.getTasks();
    }

    return (
        <div>
            <IconButton onClick={openEditTask}>
                <EditIcon /> 
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={closeEditTask}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <FormControl className="editFormFrame" variant="outlined">
                    <OutlinedInput
                    id="editFormInput"
                    type="text"
                    defaultValue={props.task}
                    placeholder="Edit your task..."
                    endAdornment = {
                        <InputAdornment position="end">
                        <IconButton onClick={editTask} edge="end">
                            <CheckIcon id="editIcon" />
                        </IconButton>
                        </InputAdornment>
                    }
                    />
                </FormControl>
            </Popover>
        </div>
      );
}

export default EdiTask;