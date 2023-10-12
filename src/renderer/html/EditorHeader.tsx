import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Typography } from "@mui/material";
import React from "react";

export function EditorHeader() {
    return <div
        style={{
            display: "inline-block",
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 10,
            paddingRight: 10,
            height: 20,
            // todo should come from theme
            backgroundColor: "#ffffff"
        }}
    >
        <InsertDriveFileIcon fontSize="small"/>
        <Typography style={{marginLeft: 25}} variant="caption">filename.js</Typography>
    </div>;
}
