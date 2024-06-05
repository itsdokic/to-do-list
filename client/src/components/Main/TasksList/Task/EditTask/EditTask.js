import React from "react";

import {
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Popover,
} from "@mui/material";
import { Check, Edit } from "@mui/icons-material";
import axios from "axios";

import "./EditTask.css";

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
        const input = event.target
            .closest(".editFormFrame")
            .querySelector("#editFormInput");
        const editedTaskName = input.value.trim();

        if (editedTaskName !== "" && editedTaskName !== props.task) {
            await axios
                .post("http://localhost:5000/editTask", {
                    taskId: props.taskId,
                    task: editedTaskName,
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

        setAnchorEl(null);
        props.getTasks();
    }

    return (
        <div>
            <IconButton onClick={openEditTask}>
                <Edit />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={closeEditTask}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <FormControl className="editFormFrame" variant="outlined">
                    <OutlinedInput
                        id="editFormInput"
                        type="text"
                        defaultValue={props.task}
                        placeholder="Edit your task..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={editTask} edge="end">
                                    <Check id="editIcon" />
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
