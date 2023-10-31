import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";
import { BoxBackground } from "./BoxBackground";

interface Props {
    border?: "top" | "bottom" | "left" | "right";
    style?: CSSProperties;
    children: React.JSX.Element | React.JSX.Element[];
}

export function BoxBackgroundMain(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <BoxBackground
            border={props.border}
            backgroundColor={theme.palette.primary.main}
            style={props.style}
        >
            {props.children}
        </BoxBackground>
    );
}
