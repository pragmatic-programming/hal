import { Edge, Position, useEdges } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    nodeId: string;
}

export default function HandleTargetLeft(props: Props): React.JSX.Element {
    const edges: Edge<EdgeData>[] = useEdges();
    const targetEdge: Edge | undefined = edges.find((edge: Edge<EdgeData>) => edge.target === props.nodeId && edge.targetHandle === "left");
    return (
        <HandleTarget
            id={"left"}
            position={Position.Left}
            isConnected={targetEdge !== undefined}
            {...props}
        />
    );
}
