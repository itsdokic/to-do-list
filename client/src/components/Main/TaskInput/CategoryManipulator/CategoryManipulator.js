import React, { useEffect } from "react";

import {
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Popover,
} from "@mui/material";
import { AddCircle, Delete } from "@mui/icons-material";
import axios from "axios";

import "./CategoryManipulator.css";

function CategoryManipulator(props) {
    const [anchorEl, setAnchorEl] = React.useState(props.anchorEl);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        setAnchorEl(props.anchorEl);
    }, [props.anchorEl]);

    const open = props.open;

    async function addCategory(event) {
        const input = event.target
            .closest(".categoryFormFrame")
            .querySelector("#categoryFormInput");
        const categoryName = input.value.trim();

        if (categoryName !== "") {
            await axios
                .post("http://localhost:5000/addCategory", {
                    userId: userId,
                    category: categoryName,
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

        props.onClose();
        props.getCategories();
    }

    async function deleteCategory(event) {
        const input = event.target
            .closest(".categoryFormFrame")
            .querySelector("#categoryFormInput");
        const categoryName = input.value.trim();

        if (categoryName !== "") {
            await axios
                .post("http://localhost:5000/deleteCategory", {
                    userId: userId,
                    category: categoryName,
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

        props.onClose();
        props.getCategories();
    }

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={props.onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <FormControl className="categoryFormFrame" variant="outlined">
                <OutlinedInput
                    id="categoryFormInput"
                    type="text"
                    placeholder="Enter a category name..."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={
                                    props.action === "add"
                                        ? addCategory
                                        : deleteCategory
                                }
                                edge="end"
                            >
                                {props.action === "add" ? (
                                    <AddCircle id="editIcon" />
                                ) : (
                                    <Delete id="editIcon" />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Popover>
    );
}

export default CategoryManipulator;
