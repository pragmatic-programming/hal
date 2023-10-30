import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";

interface Props {
    id: string;
    nodeId: string;
    style?: CSSProperties;
}

export default function HandleSource(props: Props): React.JSX.Element {
    const connecting = useStore((state: State) => state.connectingSourceNodeId !== null);
    const theme: Theme = useTheme();
    let style: CSSProperties = {
        ...props.style,
        padding: 5,
        right: -8,
    };
    if (connecting) {
        style = {
            ...style,
            backgroundColor: theme.palette.error.light
        };
    }
    return (
        <HandleStyled
            id={props.id}
            position={Position.Right}
            style={style}
            type="source"
        />
    );
}
