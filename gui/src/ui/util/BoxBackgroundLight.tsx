import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";
import { BoxBackground } from "./BoxBackground";

interface Props {
    border?: "top" | "bottom" | "left" | "right" | "top-bottom-left-right";
    borderColor?: string;
    style?: CSSProperties;
    children: React.ReactNode;
}

export function BoxBackgroundLight(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <BoxBackground
            border={props.border}
            backgroundColor={theme.palette.primary.light}
            style={props.style}
        >
            {props.children}
        </BoxBackground>
    );
}
