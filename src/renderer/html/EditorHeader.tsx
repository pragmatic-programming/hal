import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Chip } from "@mui/material";
import React from "react";

interface Props {
    language: string;
}

export function EditorHeader(props: Props): React.JSX.Element {
    return (
        <Chip
            icon={<InsertDriveFileIcon/>}
            label={props.language}
            style={{
                // todo should come from theme
                backgroundColor: "#ffffff",
                borderRadius: 0
            }}
        />
    );
}
