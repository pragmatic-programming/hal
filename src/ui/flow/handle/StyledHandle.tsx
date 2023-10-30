import { Handle, Position } from "reactflow";
import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";

interface Props {
    style?: CSSProperties;
    id: string;
    type: "target" | "source";
    position: Position;
}

export function StyledHandle(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <Handle
            id={props.id}
            style={{
                ...props.style,
                zIndex: -1,
                backgroundColor: theme.palette.primary.dark,
            }}
            type={props.type}
            position={props.position}
        />
    );
}
