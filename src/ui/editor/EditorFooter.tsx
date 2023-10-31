import React from "react";
import { BoxBackgroundLight } from "../BoxBackgroundLight";
import { Typography } from "@mui/material";

interface Props {
    language: "JavaScript";
}

export const editorFooterHeight = 34;

export default function EditorFooter(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundLight
            border="top"
            style={{
                alignItems: "center",
                display: "flex",
                height: editorFooterHeight,
                paddingLeft: 8,
                paddingRight: 46,
            }}
        >
            <Typography variant="caption">
                {props.language}
            </Typography>
        </BoxBackgroundLight>
    );
}
