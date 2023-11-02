import React from "react";
import { BoxBackgroundLight } from "../BoxBackgroundLight";
import { Typography } from "@mui/material";

interface Props {
    language: "JavaScript";
}

export const editorFooterHeight = 36;

export default function EditorFooter(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundLight
            border="top"
            style={{
                alignItems: "center",
                display: "flex",
                // reduce height by 1 since top border is set
                height: editorFooterHeight - 1,
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
