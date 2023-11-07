import { Handle, Position } from "reactflow";
import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    style?: CSSProperties;
    id: string;
    type: "target" | "source";
    position: Position;
}


function createStyle(props: Props, theme: Theme): React.CSSProperties | undefined {
    let style: React.CSSProperties = {
        backgroundColor: theme.palette.primary.dark,
        ...props.style,
        zIndex: -1,
        padding: 5,
    };
    switch (props.position) {
        case Position.Bottom:
            style = {
                ...style,
                bottom: -8,
            };
            break;
        case Position.Left:
            style = {
                ...style,
                left: -8,
            };
            break;
        case Position.Right:
            style = {
                ...style,
                right: -8,
            };
            break;
        case Position.Top:
            style = {
                ...style,
                top: -8,
            };
            break;
    }
    return style;
}

export default function HandleStyled(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <Handle
            id={props.id}
            style={createStyle(props, theme)}
            type={props.type}
            position={props.position}
        />
    );
}
