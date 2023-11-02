import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    border?: "top" | "bottom" | "left" | "right";
    backgroundColor: string;
    style?: CSSProperties;
    children: React.JSX.Element | React.JSX.Element[];
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
    }
    return (
        <div
            style={style}
        >
            {props.children}
        </div>
    );
}
