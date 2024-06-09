import React, { useState } from "react";

import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import axios from "axios";

import "./TaskInput.css";
import CategoryManipulator from "./CategoryManipulator/CategoryManipulator";

function TaskInput(props) {
    const userId = localStorage.getItem("userId");

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
        console.log(newTaskCategory);

        if (newTaskName !== "" && newTaskCategory !== "") {
            await axios
                .post("http://localhost:5000/addtask", {
                    userId: userId,
                    task: newTaskName,
                    category: newTaskCategory,
                })
                .then(
                    (response) => {
                        console.log("Uspješno");
                    },
                    (error) => {
                        console.log("Error", error);
                    }
                );

            taskInput.value = "";
            categoryInput.value = "";
            validationMessage.textContent = "‎";

            props.getTasks(userId);
        } else if (newTaskName === "" && newTaskCategory !== "") {
            validationMessage.textContent = "Enter a task!";
        } else if (newTaskCategory === "" && newTaskName !== "") {
            validationMessage.textContent = "Select a category!";
        } else {
            validationMessage.textContent =
                "Enter a task and select a category!";
        }
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [action, setAction] = useState();

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
                                className="category"
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
                                <option value="addCategory">
                                    Add a new category
                                </option>
                                <option value="deleteCategory">
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
