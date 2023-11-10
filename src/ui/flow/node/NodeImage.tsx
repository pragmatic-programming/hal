import React from "react";
import { NodeProps } from "reactflow";
import HandleTarget from "../handle/HandleTarget";
import { NodeDataImage } from "../../../model/NodeData";

export default function NodeImage(props: NodeProps<NodeDataImage>): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    return (
        <>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <img style={{width: props.data.width, height: props.data.height}} src={props.data.content} alt={props.id}/>
        </>
    );
}
