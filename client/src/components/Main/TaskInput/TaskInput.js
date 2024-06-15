import React from "react";

import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import axios from "axios";

import "./TaskInput.css";
import CategoryManipulator from "./CategoryManipulator/CategoryManipulator";
import CustomSnackbar from "../../common/CustomSnackbar/CustomSnackbar";

function TaskInput(props) {
    const userId = localStorage.getItem("userId");
    const [responseMessage, setResponseMessage] = React.useState("");
    const [snackbarSeverity, setSnackbarSeverity] = React.useState("");

    async function addTask(event) {
        let validationMessage = event.target
            .closest(".taskInput")
            .querySelector("#validationMessage");
        const taskInput = event.target
            .closest(".formFrame")
            .querySelector("#formInput");
        const newTaskName = taskInput.value.trim();
        const categoryInput = event.target
            .closest(".formFrame")
            .querySelector("#category");
        const newTaskCategory = categoryInput.value;
        const recurringInput = event.target
            .closest(".formFrame")
            .querySelector("#recurring");
        const newTaskRecurring = recurringInput.value;

        if (
            newTaskName !== "" &&
            newTaskCategory !== "" &&
            newTaskRecurring !== ""
        ) {
            await axios
                .post("http://localhost:5000/tasks/addtask", {
                    userId: userId,
                    task: newTaskName,
                    category: newTaskCategory,
                    recurring: newTaskRecurring,
                    lastRecurred: new Date(),
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

            taskInput.value = "";
            categoryInput.value = "";
            recurringInput.value = "";
            validationMessage.textContent = "‎";

            props.getTasks(userId);
        } else if (newTaskName === "") {
            validationMessage.textContent = "Enter a task!";
        } else if (newTaskCategory === "") {
            validationMessage.textContent = "Select a category!";
        } else {
            validationMessage.textContent = "Select a recurrence!";
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [action, setAction] = React.useState();

    function openCategoryManipulator(event) {
        if (event.currentTarget.value === "addCategory") {
            const categoryInput = event.target
                .closest(".formFrame")
                .querySelector("#category");

            categoryInput.value = "";

            setAnchorEl(event.currentTarget);
            setIsPopoverOpen(true);
            setAction("add");
        } else if (event.currentTarget.value === "deleteCategory") {
            const categoryInput = event.target
                .closest(".formFrame")
                .querySelector("#category");

            categoryInput.value = "";

            setAnchorEl(event.currentTarget);
            setIsPopoverOpen(true);
            setAction("delete");
        }
    }

    function closeCategoryManipulator() {
        setAnchorEl(null);
        setIsPopoverOpen(false);
    }

    return (
        <div className="taskInput">
            <FormControl className="formFrame" variant="outlined">
                <OutlinedInput
                    id="formInput"
                    type="text"
                    placeholder="Enter a title for a task..."
                    endAdornment={
                        <InputAdornment position="end">
                            <select
                                onChange={openCategoryManipulator}
                                id="category"
                                className="select"
                            >
                                <option
                                    className="disabled"
                                    value=""
                                    selected
                                    disabled
                                >
                                    Category
                                </option>
                                <option value="To Do">To Do</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Work">Work</option>
                                <option value="School">School</option>
                                {props.categories.map((category) => (
                                    <option value={category}>
                                        {category.category}
                                    </option>
                                ))}
                                <option disabled className="optionsDivider">
                                    -
                                </option>
                                <option
                                    value="addCategory"
                                    className="addCategory"
                                >
                                    Add a new category
                                </option>
                                <option
                                    value="deleteCategory"
                                    className="deleteCategory"
                                >
                                    Delete a category
                                </option>
                            </select>
                            <CategoryManipulator
                                anchorEl={anchorEl}
                                open={isPopoverOpen}
                                onClose={closeCategoryManipulator}
                                action={action}
                                getCategories={() =>
                                    props.getCategories(userId)
                                }
                            />
                            <select id="recurring" className="select">
                                <option
                                    className="disabled"
                                    value=""
                                    selected
                                    disabled
                                >
                                    Recurring
                                </option>
                                <option value="Never">Never</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Daily">Daily</option>
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                            </select>
                            <IconButton onClick={addTask} edge="end">
                                <AddCircle className="addIcon" />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <p id="validationMessage">‎</p>
            <hr className="dividerLine"></hr>
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

export default TaskInput;
