import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";

interface Props {
    order?: number;
    nodeId: string;
    style?: CSSProperties;
    position: Position;
    edgeDefinition: EdgeDefinition;
}


export default function HandleSource(props: Props): React.JSX.Element {
    console.log(props.edgeDefinition);
    const connecting = useStore((state: State) => state.reactFlow.connectingSourceNodeId !== null);
    const theme: Theme = useTheme();
    let style: CSSProperties = {};
    if (props.edgeDefinition?.style) {
        style = {
            ...style,
            backgroundColor: props.edgeDefinition?.style.stroke
        };
    }
    if (connecting) {
        style = {
            ...style,
            backgroundColor: theme.palette.error.light
        };
    }
    return (
        <HandleStyled
            id={props.edgeDefinition.type}
            order={props.order}
            position={props.position}
            style={style}
            type="source"
        />
    );
}
