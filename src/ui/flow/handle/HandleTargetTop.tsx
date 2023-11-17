import { Edge, Position, useEdges } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    nodeId: string;
}

export default function HandleTargetTop(props: Props): React.JSX.Element {
    const edges: Edge<EdgeData>[] = useEdges();
    const targetEdge: Edge | undefined = edges.find((edge: Edge<EdgeData>) => edge.target === props.nodeId && edge.targetHandle === "top");
    return (
        <HandleTarget
            id={"top"}
            position={Position.Top}
            isConnected={targetEdge !== undefined}
            {...props}
        />
    );
}
