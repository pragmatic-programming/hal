import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";

interface Props {
    nodeId: string;
    style?: CSSProperties;
}

export default function HandleTarget(props: Props): React.JSX.Element {
    const isPossibleTarget = useStore((state: State) => state.connectingSourceNodeId !== null && state.connectingSourceNodeId !== props.nodeId);
    const theme: Theme = useTheme();
    let style: CSSProperties = {
        ...props.style,
        padding: 5,
        left: -8,
    };
    if (isPossibleTarget) {
        style = {
            ...style,
            backgroundColor: theme.palette.success.light
        };
    }
    return (
        <HandleStyled
            id="input"
            position={Position.Left}
            style={style}
            type="target"
        />
    );
}
