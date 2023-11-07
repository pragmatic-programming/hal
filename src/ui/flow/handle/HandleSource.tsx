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
    position: Position;
}


export default function HandleSource(props: Props): React.JSX.Element {
    const connecting = useStore((state: State) => state.reactFlow.connectingSourceNodeId !== null);
    const theme: Theme = useTheme();
    let style: CSSProperties = {};
    if (connecting) {
        style = {
            ...style,
            backgroundColor: theme.palette.error.light
        };
    }
    return (
        <HandleStyled
            style={style}
            id={props.id}
            position={props.position}
            type="source"
        />
    );
}
