import React from "react";
import { BoxBackgroundLight } from "../BoxBackgroundLight";
import { Typography } from "@mui/material";

interface Props {
    language: "JavaScript";
}

export default function EditorFooter(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundLight
            border="top"
            style={{
                height: 30,
                paddingLeft: 8,
                paddingRight: 46,
                paddingTop: 4,
            }}
        >
            <Typography variant="caption">
                {props.language}
            </Typography>
        </BoxBackgroundLight>
    );
}
