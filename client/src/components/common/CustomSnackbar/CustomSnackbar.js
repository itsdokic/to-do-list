import React from "react";

import { Snackbar, Alert } from "@mui/material";

import "./CustomSnackbar.css";

function CustomSnackbar(props) {
    const [open, setOpen] = React.useState(true);

    function handleClose() {
        setOpen(false);
        props.setResponseMessage("");
    }

    return (
        <div>
            <Snackbar
                className="snackbar"
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    className="snackbarAlert"
                    onClose={handleClose}
                    severity={props.severity}
                    variant="filled"
                >
                    {props.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default CustomSnackbar;
