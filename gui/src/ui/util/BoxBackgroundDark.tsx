import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";
import { BoxBackground } from "./BoxBackground";

interface Props {
    border?: "top" | "bottom" | "left" | "right" | "top-bottom-left-right";
    borderColor?: string;
    borderWidth?: number;
    style?: CSSProperties;
    children: React.ReactNode;
}

export function BoxBackgroundDark(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <BoxBackground
            backgroundColor={theme.palette.primary.dark}
            border={props.border}
            borderColor={props.borderColor}
            borderWidth={props.borderWidth}
            style={props.style}
        >
            {props.children}
        </BoxBackground>
    );
}
