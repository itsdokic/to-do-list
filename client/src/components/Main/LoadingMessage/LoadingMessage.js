import React from "react";

import { CircularProgress } from "@mui/material";

import "./LoadingMessage.css";

function LoadingMessage() {
    return (
        <div className="loading">
            <p className="text1">
                Please wait a moment! Our server is restarting after being inactive.
            </p>
            <p className="text2">Thanks for your patience!</p>
            <CircularProgress size={60} sx={{ color: "white" }} />
        </div>
    );
}

export default LoadingMessage;
