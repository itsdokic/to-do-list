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

import CustomSnackbar from "../../../../common/CustomSnackbar/CustomSnackbar";
import "./EditTask.css";

function EditTask(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [responseMessage, setResponseMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("");

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
                .post("http://localhost:5000/tasks/editTask", {
                    taskId: props.taskId,
                    task: editedTaskName,
                })
                .then(
                    (response) => {
                        setResponseMessage(response.data);
                        setSnackbarSeverity("success");
                    },
                    (error) => {
                        setResponseMessage(error.response.data);
                        setSnackbarSeverity("error");
                    }
                );
        }

        setAnchorEl(null);
        props.getTasks();
    }

    return (
        <div>
            <IconButton onClick={openEditTask}>
                <Edit className="icon" />
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
                                    <Check className="editIcon" />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Popover>
            {responseMessage !== "" ? (
                <CustomSnackbar
                    message={responseMessage}
                    severity={snackbarSeverity}
                    setResponseMessage={setResponseMessage}
                />
            ) : null}
        </div>
    );
}

export default EditTask;
