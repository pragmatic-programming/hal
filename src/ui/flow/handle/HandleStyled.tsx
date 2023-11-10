import { Handle, Position } from "reactflow";
import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    id: string;
    order?: number;
    position?: Position;
    style?: CSSProperties;
    type: "target" | "source";
}


function createStyle(props: Props, theme: Theme): React.CSSProperties | undefined {
    let style: React.CSSProperties = {
        backgroundColor: theme.palette.primary.dark,
        ...props.style,
        zIndex: -1,
        padding: 5,
    };
    const displaceFactor:number = 50;
    let displace: number = displaceFactor * (props.order ? props.order : 0);
    switch (props.position) {
        case Position.Bottom:
            style = {
                ...style,
                bottom: -8,
                left: displace ? displace : undefined,
            };
            break;
        case Position.Left:
            style = {
                ...style,
                left: -8,
                top: displace ? displace : undefined,
            };
            break;
        case Position.Right:
            style = {
                ...style,
                right: -8,
                top: displace ? displace : undefined,
            };
            break;
        case Position.Top:
            style = {
                ...style,
                top: -8,
                left: displace ? displace : undefined,
            };
            break;
    }
    return style;
}

export default function HandleStyled(props: Props): React.JSX.Element {
    if (!props.position) {
        throw new Error("Position is undefined");
    }
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
