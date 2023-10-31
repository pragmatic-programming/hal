import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    style?: CSSProperties;
    children: React.JSX.Element | React.JSX.Element[];
}

export function BoxBackgroundLight(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    let style: CSSProperties = {
        ...props.style,
        backgroundColor: theme.palette.primary.light,
    };
    return (
        <div
            style={style}
        >
            {props.children}
        </div>
    );
}
