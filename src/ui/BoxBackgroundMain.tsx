import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    border?: "top" | "bottom" | "left" | "right";
    style?: CSSProperties;
    children: React.JSX.Element | React.JSX.Element[];
}

export function BoxBackgroundMain(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const border = "1px solid " + theme.palette.primary.dark;
    let style: CSSProperties = {
        ...props.style,
        backgroundColor: theme.palette.primary.main,
    };
    switch (props.border) {
        case "top":
            style.borderTop = border;
            break;
        case "bottom":
            style.borderBottom = border;
            break;
        case "left":
            style.borderLeft = border;
            break;
        case "right":
            style.borderRight = border;
    }
    return (
        <div
            style={style}
        >
            {props.children}
        </div>
    );
}
