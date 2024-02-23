import { Edge, Position, useEdges } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";
import { TargetHandleId } from "../../../model/edge/TargetHandleId";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    id: TargetHandleId;
    nodeId: string;
    position?: Position;
    style?: CSSProperties;
}

export default function HandleTarget(props: Props): React.JSX.Element {
    const isConnected: boolean = useEdges<EdgeData>()
        .find((edge: Edge<EdgeData>) => edge.target === props.nodeId && edge.targetHandle === props.id) !== undefined;
    const isPossibleTarget: boolean = useStore((state: State) =>
        state.flow.connectingSourceNodeId !== null &&
        state.flow.connectingSourceNodeId !== props.nodeId
    );
    const theme: Theme = useTheme();
    const style: CSSProperties = {};
    if (isPossibleTarget) {
        style.backgroundColor = theme.palette.success.light;
    }
    const hidden: boolean = !isConnected && !isPossibleTarget;
    if (hidden) {
        style.visibility = "hidden";
    }
    return (
        <HandleStyled
            style={style}
            type="target"
            {...props}
        />
    );
}
