import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";

interface Props {
    nodeId: string;
    style?: CSSProperties;
    position: Position;
}


export default function HandleTarget(props: Props): React.JSX.Element {
    const isPossibleTarget = useStore((state: State) => state.reactFlow.connectingSourceNodeId !== null && state.reactFlow.connectingSourceNodeId !== props.nodeId);
    const theme: Theme = useTheme();
    let style: CSSProperties = {};
    if (isPossibleTarget) {
        style = {
            ...style,
            backgroundColor: theme.palette.success.light
        };
    }
    return (
        <HandleStyled
            style={style}
            id="input"
            position={props.position}
            type="target"
        />
    );
}
