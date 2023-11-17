import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    backgroundColor: string;
    border?: "top" | "bottom" | "left" | "right" | "top-bottom-left-right";
    children: React.ReactNode;
    style?: CSSProperties;
}

export function BoxBackground(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const border: string = "1px solid " + theme.palette.primary.dark;
    let style: CSSProperties = {
        ...props.style,
        backgroundColor: props.backgroundColor,
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
            break;
        case "top-bottom-left-right":
            style.border = border;
            break;
    }
    return (
        <div
            style={style}
        >
            {props.children}
        </div>
    );
}
