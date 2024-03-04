import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    backgroundColor: string;
    border?: "top" | "bottom" | "left" | "right" | "top-bottom-left-right";
    borderColor?: string;
    borderWidth?: number;
    children: React.ReactNode;
    style?: CSSProperties;
}

export function BoxBackground(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const borderColor: string = props.borderColor ? props.borderColor : theme.palette.primary.dark
    const borderWidth: number = props.borderWidth ? props.borderWidth : 1;
    const border: string = borderWidth + "px solid " + borderColor;
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
